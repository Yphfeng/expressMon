var program = require('../model').Program;
var tag = require('../model').tag;
var life = require('../model').life;
var skill = require('../model').skill;
function rdColor() {
  var color = '';
  var rd = Math.random();
  if (rd < 0.25) {
    color = 'green-tag';
  } else if (rd < 0.5) {
    color = 'yellow-tag';
  } else if (rd < 0.75) {
    color = 'blue-tag';
  } else if (rd < 1) {
    color = 'my-tag';
  }
  return color;
}

exports.about = function(req, res, next) {
  var queryObj = {}
  if (req.query.tag) {
    queryObj.category = req.query.tag;
  }
  program
    .find(queryObj)
    .limit(15)
    .exec(function(err, docs) {
      // var totalPage = Math.floor(docs.length/size);
      // if(docs.length%size !== 0) {
      //   totalPage += 1;
      // }
      // if(page>totalPage){
      //   page = totalPage;
      // }
      if (err) {
        console.error(err)
      } else {
        program.find(queryObj, function(err, result) {
          jsonArray = {
            data: docs,
          };
          docs.forEach(el => {
            if (el.content) {
              el.content = el.content.replace(/<[^>]+>/g, "").slice(0, 300).trim();
            }
          })
          tag.find({}, function(err, tags) {
            tags.forEach(function(el) {
              el.color = rdColor();
            })
            res.render('about', {
              one: {
                title: '关于'
              },
              program: jsonArray,
              tags: tags
            });
          });
        })
      }

    })
};

exports.resource = function(req, res, next) {
  res.render('resource', {
    one: {
      title: '前端技能图谱'
    }
  });
};

exports.trans = function(req, res, next) {
  console.log(req.query.name);
  if (!req.query || !req.query.name) {
    res.render('translate/pm2', {
      one: {
        title: 'PM2中文文档'
      }
    });
  }

  res.render('translate/' + req.query.name);
}
exports.life = function(req, res, next) {
  life.find(function(err,result){
    if(err){
      res.send(err)
    }else{
      life.find()
      .limit(5)
      .skip(2)
      .exec(function(err,docs){
        jsonArray = {
          all: docs,
          total: result.length
        }
        console.log(jsonArray);
        res.render('life/index',{
          data: jsonArray,
          title: '生活感悟'
        })
      })
    }
  })
};
exports.showOneLife = function(req,res,next) {
    life.findById(req.query.id, function(err, one) {
      life.find(function(err, program) {
        jsonArray = {
            all: program,
            total: program.length
          };
          console.log(one)
        res.render('life/show', {
          one: one,
          data: jsonArray
        });
      }).limit(15);

  });
}
exports.skill = function(req, res, next) {
    skill.find(function(err,result){
    if(err){
      res.send(err)
    }else{
      skill.find()
      .limit(5)
      .skip(0)
      .exec(function(err,docs){
        jsonArray = {
          all: docs,
          total: result.length
        }
        console.log(jsonArray);
        res.render('skill/index',{
          data: jsonArray,
          title: '技术分享'
        })
      })
    }
  })
};
exports.showOneSkill = function(req,res,next) {
    skill.findById(req.query.id, function(err, one) {
      skill.find(function(err, program) {
        jsonArray = {
            all: program,
            total: program.length
          };
          console.log(one)
        res.render('skill/show', {
          one: one,
          data: jsonArray
        });
      }).limit(15);

  });
}
exports.commonent = function(req, res, next) {
  res.render('commonent/index', {
    one: {
      title: '评论'
    }
  });
};