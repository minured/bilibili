function changeToTree(data) {
  // 每条评论文档的_id
  function fn(_id) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].parentId === _id) {
        arr.push(data[i]);
        data[i].children = fn(data[i]._id);
      }
    }
    return arr;
  }
  return fn(null);
}

const list = [
  {
    _id: "1",
    content: "一级评论测试",
    parentId: null,
  },
  {
    _id: "2",
    content: "嵌套三级级评论测试",
    parentId: "1",
  },
  {
    _id: "3",
    content: "嵌套三级级评论测试",
    parentId: "1",
  },
  {
    _id: "4",
    content: "嵌套三级级评论测试last",
    parentId: "3",
  },
];

const res = changeToTree(list);
console.log(res);
