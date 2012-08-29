// Generated by CoffeeScript 1.3.3
var COLON, exec, fs, getCMD, isAbsPath, isExeAble, mkdirp, spawn, sysPath, wrapFile, wrapJs, writeFile, _ref;

fs = require("fs");

sysPath = require("path");

_ref = require("child_process"), spawn = _ref.spawn, exec = _ref.exec;

mkdirp = require("mkdirp");

COLON = process.platform === "win32" ? ";" : ":";

isAbsPath = function(path) {
  return path.charAt(0) === "/";
};

isExeAble = function(cmd) {};

getCMD = function(cmd) {
  var runPathes;
  if (isAbsPath(cmd)) {
    return cmd;
  }
  runPathes = process.env.PATH.split(COLON);
  return runPathes.forEach(function(path, index) {
    var testCMD;
    testCMD = sysPath.join(path, cmd);
    return console.log(index);
  });
};

writeFile = function(path, source, callback) {
  var dirname;
  dirname = sysPath.dirname(path);
  return fs.stat(dirname, function(err, stat) {
    if ((err != null) || !stat.isDirectory()) {
      return mkdirp(dirname, function(err) {
        if (err != null) {
          return callback(err);
        }
        return fs.writeFile(path, source, callback);
      });
    } else {
      return fs.writeFile(path, source, callback);
    }
  });
};

wrapJs = function(source, id) {
  return "define(" + id + ", function(require, exports, module){\n  " + (source.replace(/\n(?!\n)/g, '\n  ')) + "\n});";
};

wrapFile = function(filename, dest) {};

module.exports = {
  getCMD: getCMD,
  writeFile: writeFile
};