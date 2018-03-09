var article = require('../model/index').Article;
var program = require('../model/index').Program;
var tag = require('../model/index').tag;
var life = require('../model/index').life;
var skill = require('../model/index').skill;
var admin = require('../config/admin');

// 后台登录页面
exports.showLogin = function(req, res, next) {
  res.render('admin/login');
};

exports.login = function(req, res, next) {
  console.log(req.query.password);
  console.log(req.query.name);
  if (req.query.password == admin.pwd && req.query.name == admin.name) {
    req.session.isAuth = 2;
    res.redirect('/admin/program');
  } else {
    res.redirect('/admin');
  }
};

// 随笔首页
exports.programIndex = function(req, res, next) {
  var queryObj = {}
  if (req.query.tag) {
    queryObj.category = req.query.tag;
  }
  if (!req.query.size) {
    var size = req.query.size = 5;
  } else {
    var size = Number(req.query.size);
  }
  if (!req.query.page) {
    var page = req.query.page = 1;
  } else {
    var page = Number(req.query.page);
  }
  program.find(queryObj)
    .limit(size)
    .skip((page - 1) * size)
    .exec(function(err, result) {
      if (err) {
        res.send(err);
      } else {
        program.find(function(err, sult) {
          jsonArray = {
            data: result,
            total: sult.length
          };
          res.render('admin/content/program/index', {
            docs: jsonArray,
            session: req.session,
            one: {
              title: '博文'
            }
          });
        })
      }

    })
};

// 修改随笔
exports.showProgramEdit = function(req, res, next) {
  program.find({
    _id: req.query._id
  }, function(err, program) {
    console.log('program edit:', program);

    res.render('admin/content/program/edit', {
      session: req.session,
      program: program
    });
  });
};

exports.programEdit = function(req, res, next) {
  res.redirect('/admin/program');
  var title = req.body.title;
  var content = req.body.content;
  var category = req.body.category;
  var _id = req.body._id;
  program.findOneAndUpdate({
      _id: _id
    }, {
      content: content,
      title: title,
      category: category
    },
    function(err, result) {
      console.log(result);
    }
  )
};

// 新建随笔
exports.showProgramAdd = function(req, res, next) {
  res.render('admin/content/program/add', {
    session: req.program
  });
};

exports.programAdd = function(req, res, next) {
  var title = req.body.title;
  var content = req.body.content;
  var category = req.body.category;

  program.create({
    category: category,
    content: content,
    title: title
  }, function() {
    console.log('新建成功');
    res.redirect('/admin/program');
  });
};

// 删除随笔
exports.programDel = function(req, res, next) {
  var _id = req.query._id;
  program.remove({
    "_id": _id
  }, function(err) {
    res.redirect('/admin/program');
  });
};

/* 随笔的相关标签 */
exports.showTags = function(req, res, next) {
  tag.find({}, function(err, tags) {
    res.render('admin/content/tag', {
      tags: tags
    });
  });
}

exports.showAddTags = function(req, res, next) {
  var name = req.body.name;
  res.render('admin/content/tag/add');
}

exports.addTags = function(req, res, next) {
  var tagname = req.body.name;
  tag.create({
    name: tagname
  }, function() {
    res.redirect('/admin/tag');
  })
}

exports.showEditTags = function(req, res, next) {
  var _id = req.query._id;
  console.log(_id);
  tag.findById(_id, function(err, tag) {
    res.render('admin/content/tag/edit', {
      tag: tag
    });
  });
}

exports.editTags = function(req, res, next) {
  var _id = req.body._id;
  var name = req.body.name;

  tag.findOneAndUpdate({
    _id: _id
  }, {
    name: name
  }, function(err, result) {
    res.redirect('/admin/tag');
  });
}

exports.delTag = function(req, res, next) {
  tag.remove({
    _id: req.query._id
  }, function(err, result) {
    res.redirect('/admin/tag');
  });
}

// 生活感悟列表
exports.lifeIndex = function(req, res, next) {
  if (!req.query.size) {
    var size = req.query.size = 5;
  } else {
    var size = Number(req.query.size);
  }
  if (!req.query.page) {
    var page = req.query.page = 1;
  } else {
    var page = Number(req.query.page);
  }
  life.find()
    .limit(size)
    .skip((page - 1) * size)
    .exec(function(err, result) {
      if (err) {
        res.send(err);
      } else {
        life.find(function(err, sult) {
          jsonArray = {
            data: result,
            total: sult.length
          };
          res.render('admin/content/life/index', {
            docs: jsonArray,
            session: req.session,
            one: {
              title: '生活感悟'
            }
          });
        })
      }

    })

}

exports.showLifeAdd = function(req, res, next) {
  res.render('admin/content/life/add');
}

exports.lifeAdd = function(req, res, next) {
  var title = req.body.title;
  var content = req.body.content;

  life.create({
    content: content,
    title: title
  }, function() {
    console.log('新建成功');
    res.redirect('/admin/life');
  });
}


exports.skill = function(req,res,next) {
    if (!req.query.size) {
    var size = req.query.size = 5;
  } else {
    var size = Number(req.query.size);
  }
  if (!req.query.page) {
    var page = req.query.page = 1;
  } else {
    var page = Number(req.query.page);
  }
  skill.find()
    .limit(size)
    .skip((page - 1) * size)
    .exec(function(err, result) {
      if (err) {
        res.send(err);
      } else {
        skill.find(function(err, sult) {
          jsonArray = {
            data: result,
            total: sult.length
          };
          res.render('admin/content/skill/index', {
            docs: jsonArray,
            session: req.session,
            one: {
              title: '生活感悟'
            }
          });
        })
      }

    })
}
exports.skillAdd = function(req, res, next) {
  var title = req.body.title;
  var content = req.body.content;

  skill.create({
    content: content,
    title: title
  }, function() {
    console.log('新建成功');
    res.redirect('/admin/skill');
  });
}
exports.showSkillAdd = function(req, res, next) {
  res.render('admin/content/skill/add');
}