const Showcase = require('../models/Showcase');
const showcaseMock = require('../mock/showcaseItems.json');

module.exports = async () => {
  const showcaseItems = await Showcase.find();
  if (showcaseItems.length !== showcaseMock.length) {
    await createInitialEntity(Showcase, showcaseMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item.id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
