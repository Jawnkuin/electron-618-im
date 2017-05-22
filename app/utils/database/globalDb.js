const getGlobalModels = require('./models_global');

let globalDb = null;

async function getGlobalDb () {
  if (!globalDb) {
    const models = getGlobalModels();
    await models.sequelize.sync();

    globalDb = {
      /** @name 图片存储相关*/
      // INSERT OR REPLACE INTO imimage(hashcode,localPath,urlPath)
      insertImImageEntity: function InsertImImageEntity (entity) {
        return models.imimage.create(entity);
      },
      // select * from imimage where hashcode=? limit 1
      getImImageEntityByHashcode: function GetImImageEntityByHashcode (hashcode) {
        return models.imimage.findAll({ where: { hashcode }, limit: 1 });
      },
      // update imimage set localPath=? where hashcode=?
      updateImImageEntity: function UpdateImImageEntity (entity) {
        return models.imimage.update({ localPath: entity.localPath }, { where: { hashcode: entity.hashcode }
        });
      }
    };
  }

  return globalDb;
}


module.exports = getGlobalDb;
