import {
  GoogleSpreadsheet,
  GoogleSpreadsheetCell,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { columnToLetter } from "./utils";
import { BasePlayer, RatedPlayer, Season, WeekResult } from "./types";
import { SEASON_NAMES } from "./constants";

const NUM_ROWS_TO_FETCH = 25;

const MAX_NUM_WEEKS = 15;

function findCellWithValue(
  sheet: GoogleSpreadsheetWorksheet,
  value: string,
  columnCount: number,
  rowCount: number
): GoogleSpreadsheetCell | undefined {
  for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const cell = sheet.getCellByA1(
        `${columnToLetter(columnIndex + 1)}${rowIndex + 1}`
      );
      if (cell.value === value) {
        return cell;
      }
    }
  }
}

function getBasePlayers(
  sheet: GoogleSpreadsheetWorksheet,
  firstNameColumnIndex: number,
  nameRowIndex: number,
  maxColumnIndex: number
): BasePlayer[] {
  const players: BasePlayer[] = [];
  let nameColumnIndex = firstNameColumnIndex;
  while (nameColumnIndex <= maxColumnIndex) {
    const playerNameCell = sheet.getCellByA1(
      `${columnToLetter(nameColumnIndex + 1)}${nameRowIndex + 1}`
    );
    if (!playerNameCell.value || typeof playerNameCell.value !== "string") {
      break;
    }
    players.push({
      name: playerNameCell.value,
      nameColumnIndex,
    });
    nameColumnIndex++;
  }
  return players;
}

function sortPlayers(
  ratedPlayers: RatedPlayer[],
  compareFn: (left: RatedPlayer, right: RatedPlayer) => number
): RatedPlayer[] {
  const sortedRatedPlayers = [...ratedPlayers];
  sortedRatedPlayers.sort(compareFn);
  return sortedRatedPlayers;
}

function sortPlayersByRating(ratedPlayers: RatedPlayer[]): RatedPlayer[] {
  return sortPlayers(ratedPlayers, (left, right) => right.rating - left.rating);
}

function getAllWeekResults(
  sheet: GoogleSpreadsheetWorksheet,
  firstWeekColumnIndex: number,
  firstWeekRowIndex: number,
  basePlayers: BasePlayer[]
): WeekResult[] {
  const allWeekResults: WeekResult[] = [];
  for (
    let rowIndex = firstWeekRowIndex;
    rowIndex < firstWeekRowIndex + MAX_NUM_WEEKS;
    rowIndex++
  ) {
    const firstPlayerCell = sheet.getCellByA1(
      `${columnToLetter(firstWeekColumnIndex + 1)}${rowIndex + 1}`
    );
    if (!firstPlayerCell.value) {
      // reached a week where the first player's rating is blank, so we probably have collected all weeks for the season
      break;
    }

    const weekNumber = rowIndex - firstWeekRowIndex + 1;
    const ratedPlayers: RatedPlayer[] = [];
    for (let playerIndex = 0; playerIndex < basePlayers.length; playerIndex++) {
      const cell = sheet.getCellByA1(
        `${columnToLetter(firstWeekColumnIndex + playerIndex + 1)}${
          rowIndex + 1
        }`
      );
      if (!cell.value) {
        continue;
      }
      const ratingNumber = Number(cell.value);
      if (isNaN(ratingNumber)) {
        continue;
      }
      const initialWeekCell = sheet.getCellByA1(
        `${columnToLetter(
          firstWeekColumnIndex + playerIndex + 1
        )}${firstWeekRowIndex}`
      );
      if (!initialWeekCell.value) {
        continue;
      }
      const initialWeekRatingNumber = Number(initialWeekCell.value);
      if (isNaN(initialWeekRatingNumber)) {
        continue;
      }
      const previousWeekCell = sheet.getCellByA1(
        `${columnToLetter(firstWeekColumnIndex + playerIndex + 1)}${rowIndex}`
      );
      if (!previousWeekCell.value) {
        continue;
      }
      const previousWeekRatingNumber = Number(previousWeekCell.value);
      if (isNaN(previousWeekRatingNumber)) {
        continue;
      }
      ratedPlayers.push({
        name: basePlayers[playerIndex].name,
        rating: Math.round(ratingNumber),
        ratingChangeThisWeek: Math.round(
          ratingNumber - previousWeekRatingNumber
        ),
        ratingChangeThisSeason: Math.round(
          ratingNumber - initialWeekRatingNumber
        ),
      });
    }
    if (ratedPlayers.length === basePlayers.length) {
      // week row has complete data (a rating for each player)
      allWeekResults.push({
        weekNumber,
        ratedPlayers: sortPlayersByRating(ratedPlayers),
      });
    }
  }
  return allWeekResults;
}

export async function fetchSeason(seasonIndex: number): Promise<Season> {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("API Key missing");
  }

  const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
  if (!sheetId) {
    throw new Error("Google Sheet ID missing");
  }

  const seasonName = SEASON_NAMES[seasonIndex];

  if (!seasonName) {
    throw new Error(`Season index ${seasonIndex} not found`);
  }

  const startMs = performance.now();

  const doc = new GoogleSpreadsheet(sheetId, { apiKey });

  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByTitle[seasonName];

  const { columnCount } = sheet;

  await sheet.loadCells(
    `A1:${columnToLetter(columnCount)}${NUM_ROWS_TO_FETCH}`
  );

  const week0HeaderCell = findCellWithValue(
    sheet,
    "Week 0",
    columnCount,
    NUM_ROWS_TO_FETCH
  );

  if (!week0HeaderCell) {
    throw new Error("Could not find 'Week 0' header");
  }

  const basePlayers = getBasePlayers(
    sheet,
    week0HeaderCell.columnIndex + 1,
    week0HeaderCell.rowIndex - 1,
    columnCount - 1
  );

  const allWeekResults = getAllWeekResults(
    sheet,
    week0HeaderCell.columnIndex + 1,
    week0HeaderCell.rowIndex + 1,
    basePlayers
  );

  console.log(
    `Fetching took ${(performance.now() - startMs).toLocaleString()}ms`
  );

  return { seasonIndex, seasonName, allWeekResults };
}
