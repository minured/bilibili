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

// const res = changeToTree(list);
// console.log(res);

// 数转换为数组

const treeObj2 = {
  id: "0",
  name: "0",
  children: [
    {
      id: "1",
      name: "anc",
      children: [
        {
          id: "1-1",
          name: "anc",
          children: [
            {
              id: "1-1-1",
              name: "anc",
            },
            {
              id: "1-1-2",
              name: "anc",
            },
          ],
        },
        {
          id: "1-2",
          name: "anc",
          children: [
            {
              id: "1-2-1",
              name: "anc",
            },
            {
              id: "1-2-2",
              name: "anc",
            },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "anc",
      children: [
        {
          id: "2-1",
          name: "anc",
          children: [
            {
              id: "2-1-1",
              name: "anc",
            },
            {
              id: "2-1-2",
              name: "anc",
            },
          ],
        },
        {
          id: "2-2",
          name: "anc",
          children: [
            {
              id: "2-2-1",
              name: "anc",
              children: [
                {
                  id: "2-2-1-1",
                  name: "anc",
                },
                {
                  id: "2-2-1-2",
                  name: "anc",
                },
              ],
            },
            {
              id: "2-2-2",
              name: "anc",
            },
          ],
        },
        {
          id: "2-3",
          name: "anc",
          children: [
            {
              id: "2-3-1",
              name: "anc",
            },
            {
              id: "2-3-2",
              name: "anc",
            },
          ],
        },
      ],
    },
    {
      id: "3",
      name: "anc",
      children: [],
    },
  ],
};

const treeObj = {
  _id: "6045dcffe8ee9d4c5cbd81f2",
  content: "二级评论",
  date: "2021-03-08",
  parentId: "6045d35ee8ee9d4c5cbd81dd",
  videoId: "bv0005",
  username: "111111",
  parentUser: "真红骑士就是我",
  userInfo: {
    _id: "604476270b687c3240cb1868",
    gender: 0,
    username: "111111",
    nickname: "真红骑士就是我",
    userImg:
      "http://localhost:3456/api/image/18a5c8d860043a0d3ba399654c1fd69d.png",
    userDesc: null,
    createdAt: "2021-03-07T06:43:51.947Z",
    updatedAt: "2021-03-07T06:44:03.461Z",
    __v: 0,
  },
  children: [
    {
      _id: "6045dfcfe8ee9d4c5cbd81f5",
      content: "三级评论",
      date: "2021-03-08",
      parentId: "6045dcffe8ee9d4c5cbd81f2",
      videoId: "bv0005",
      username: "111111",
      parentUser: "真红骑士就是我",
      userInfo: {
        _id: "604476270b687c3240cb1868",
        gender: 0,
        username: "111111",
        nickname: "真红骑士就是我",
        userImg:
          "http://localhost:3456/api/image/18a5c8d860043a0d3ba399654c1fd69d.png",
        userDesc: null,
        createdAt: "2021-03-07T06:43:51.947Z",
        updatedAt: "2021-03-07T06:44:03.461Z",
        __v: 0,
      },
      children: [],
    },
    {
      _id: "6045dfede8ee9d4c5cbd81f6",
      content: "三级评论2",
      date: "2021-03-08",
      parentId: "6045dcffe8ee9d4c5cbd81f2",
      videoId: "bv0005",
      username: "111111",
      parentUser: "真红骑士就是我",
      userInfo: {
        _id: "604476270b687c3240cb1868",
        gender: 0,
        username: "111111",
        nickname: "真红骑士就是我",
        userImg:
          "http://localhost:3456/api/image/18a5c8d860043a0d3ba399654c1fd69d.png",
        userDesc: null,
        createdAt: "2021-03-07T06:43:51.947Z",
        updatedAt: "2021-03-07T06:44:03.461Z",
        __v: 0,
      },
      children: [],
    },
    {
      _id: "6045dffae8ee9d4c5cbd81f7",
      content: "嵌套",
      date: "2021-03-08",
      parentId: "6045dcffe8ee9d4c5cbd81f2",
      videoId: "bv0005",
      username: "111111",
      parentUser: "真红骑士就是我",
      userInfo: {
        _id: "604476270b687c3240cb1868",
        gender: 0,
        username: "111111",
        nickname: "真红骑士就是我",
        userImg:
          "http://localhost:3456/api/image/18a5c8d860043a0d3ba399654c1fd69d.png",
        userDesc: null,
        createdAt: "2021-03-07T06:43:51.947Z",
        updatedAt: "2021-03-07T06:44:03.461Z",
        __v: 0,
      },
      children: [],
    },
  ],
};

// 深拷贝
function deepCopy(obj) {
  // 深度复制数组
  if (Object.prototype.toString.call(obj) === "[object Array]") {
    const object = [];
    for (let i = 0; i < obj.length; i++) {
      object.push(deepCopy(obj[i]));
    }
    return object;
  }
  // 深度复制对象
  if (Object.prototype.toString.call(obj) === "[object Object]") {
    const object = {};
    for (let p in obj) {
      object[p] = obj[p];
    }
    return object;
  }
}

function tree2Array(treeObj, rootId) {
  const temp = []; // 设置临时数组，用来存放队列
  const out = []; // 设置输出数组，用来存放要输出的一维数组
  temp.push(treeObj);
  // 首先把根元素存放入out中
  let parentId = rootId;
  const obj = deepCopy(treeObj);
  obj.parentId = parentId;
  delete obj["children"];
  out.push(obj);
  // 对树对象进行广度优先的遍历
  while (temp.length > 0) {
    const first = temp.shift();
    const children = first.children;
    if (children && children.length > 0) {
      parentId = first._id;
      const len = first.children.length;
      for (let i = 0; i < len; i++) {
        temp.push(children[i]);
        const obj = deepCopy(children[i]);
        obj.parentId = parentId;
        delete obj["children"];
        out.push(obj);
      }
    }
  }
  return out;
}

console.log(tree2Array(treeObj, null));
