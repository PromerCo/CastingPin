

var chaceRecord = wx.getStorageSync('chace_record')  //缓存数据


if (chaceRecord == '') {
  //获取缓存
  console.log('缓存为空')
  chaceRecord = [];
}

function handleCache(type = "100510", status = '0', pamer = "#") {
  var data = [];
  if (type instanceof Array) {
    for (var i = 0; i < type.length; i++) {
      chaceRecord.forEach(function (item, index) {
        if (item.code == type[i]) {
          data.push(item['name']);
        }
      })
    }
    if (status == 1) {
      data = data.join(pamer);
    }
  } else {
    chaceRecord.forEach(function (item, index) {
      if (item.code == type) {
        data = item['name'];
      }
    })
  }
  return data;
}

function columnCache(type = 'type') {
  var column = [];
  chaceRecord.forEach(function (item, index) {
    if (item.type == type) {
      column.push(item)
    }
  })
  return column
}


module.exports = {
  chaceRecord, handleCache, columnCache
}
