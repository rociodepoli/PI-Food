const { Recipe, Diet } = require("../db");

const postRecipe = async (name, summary, image, healthScore, steps, diets) => {
  try {
    const recipe = await Recipe.create({
      name,
      summary,
      healthScore: healthScore || 0,
      image,
      steps: steps || "no instructions registered",
    });
    console.log(name);
    if (diets) {
      const diet = diets.map(
        async (d) =>
          await Diet.findAll({
            where: {
              name: d,
            },
          })
      );
      const promise = await Promise.all(diet);
      //console.log(await Promise.all(diet))
      await recipe.addDiets(promise.map((d) => d[0]));
    }
    const post = await Recipe.findOne({
      where: { name: name },
      include: {
        model: Diet,
        through: {
          attributes: [],
        },
      },
    });
    return post;
  } catch (error) {
    return error;
  }
};

module.exports = postRecipe;
