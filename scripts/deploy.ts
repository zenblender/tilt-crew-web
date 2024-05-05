import ghpages from "gh-pages";

ghpages.publish("dist", (err) => {
  if (!err) {
    console.log("🚀 Deployed to gh-pages!");
  }
});
