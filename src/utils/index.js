/*
 * @Author: ykx
 * @Date: 2020-12-10 17:38:09
 * @LastEditTime: 2021-04-23 10:57:28
 * @LastEditors: your name
 * @Description:部分工具方法 & form编辑区部分操作方法
 * @FilePath: \form-design\src\utils\index.js
 */
// 参考：https://github.com/beautify-web/js-beautify 编辑器代码美化
export const beautifierConf = {
  html: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'separate',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true,
  },
  js: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true,
  },
};
export const getUuid = (length = 8) => {
  return Number(
    Math.random()
      .toString()
      .substr(3, length) + Date.now()
  ).toString(36)
}
/**
 * @description: 弹框显示切换(采用两个变量控制过渡效果,方法中使用call指定this指向)
 * @param {*}
 */
export const toggleModal = function (modalKey, flag = true) {
  if (flag) {
    this[modalKey].destroy = flag;
    this.$nextTick(() => {
      this[modalKey].visible = flag;
    });
  } else {
    this[modalKey].visible = flag;
    setTimeout(() => {
      this[modalKey].destroy = flag;
    }, 200);
  }
}
// 判断数据类型
export const getType = data => {
  let type = Object.prototype.toString.call(data)
  let typeArr = [
    'String',
    'Object',
    'Number',
    'Array',
    'Undefined',
    'Function',
    'Null',
    'Symbol'
  ]
  let name
  for (let i = 0; i < typeArr.length; i++) {
    if ('[object ' + typeArr[i] + ']' === type) {
      name = typeArr[i]
    }
  }
  return name
}
/**
 * 判断对象是否为空
 * @param {Object} target 目标对象
 */
export const isObjNull = target => {
  if (!target) {
    return false
  }
  if (getType(target) !== 'Object') {
    throw new Error('请传入对象类型参数')
  }
  return Object.keys(target).length <= 0
}
/** ******编辑区树结构部分操作方法 start *********/
export function flattenTreeDataClosure (data) {
  const treeData = JSON.parse(JSON.stringify(data))
  const flattenData = []
  function flattenTree (data, parentKey) {
    data.forEach(ele => {
      const { title, id, children, readFlag } = ele
      flattenData.push({ title, id, parentKey, readFlag })
      if (children) {
        flattenTree(children, id)
      }
    })
  }
  flattenTree(treeData, null)
  return flattenData
}
// 3.给个节点0-0-1-0，找到ta所有的父级节点
export function findParent (item, flattenTree) {
  const parentArr = [] // 存储所有的父级元素
  function find (item, flattenTree) {
    flattenTree.forEach(ele => {
      if (ele.id === item) {
        parentArr.unshift(ele)
        find(ele.parentKey, flattenTree)
      }
    })
  }
  find(item, flattenTree)
  return parentArr
}
/*
 *@functionName: 查找当前key 在树中的最近父节点
 *@params1: ${String} 唯一键
 *@params1: ${Array} 完整树结构
 *@returns ${String} 父节点key
 */
export const getParentNode = (key, tree, childrenKey) => {
  let parentNode
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node[childrenKey]) {
      if (node[childrenKey].some(item => item.key === key)) {
        parentNode = node
      } else if (getParentNode(key, node[childrenKey], childrenKey)) {
        parentNode = getParentNode(key, node[childrenKey], childrenKey)
      }
    }
  }
  return parentNode
}
/*
 *@functionName: 根据指定节点key获取指定节点全量数据
 *@params1: ${String} 唯一键
 *@params2: ${Array} 完整树结构
 */
export const getNodeByKey = (key, tree) => {
  let result
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.id === key) {
      result = node
    } else {
      if (node.children && getNodeByKey(key, node.children)) {
        result = getNodeByKey(key, node.children)
      }
    }
  }
  return result
}
/** ************end*******************/
