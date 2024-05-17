const slug = require('slug');

async function generateUniqueSlug(name, model) {
  let baseSlug = slug(name);

  let count = 1;
  let tempSlug = baseSlug;

  while (await model.findOne({ slug: tempSlug })) {
    tempSlug = `${baseSlug}-${count}`;
    count++;
  }

  return tempSlug;
}

module.exports = generateUniqueSlug;
