window.dom = {
  find(selector, targetNode) {
    return (targetNode || document).querySelector(selector);
  }, //trick
  findAll(selector, targetNode) {
    return (targetNode || document).querySelectorAll(selector);
  },
  create(string) {
    let container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  }, //使用了template模板元素及其相关方法
  after(node, newNode) {
    return node.parentNode.insertBefore(newNode, node.nextSibling);
  }, //version1

  // after(node, newNode) {
  //   node.after(newNode);
  //   return newNode;
  // }, //version2

  before(node, newNode) {
    return node.parentNode.insertBefore(newNode, node);
  },
  append(parent, node) {
    return parent.appendChild(node);
  }, //若添加的节点已经存在于DOM中，则会先移除再添加
  wrap(childNode, parentNode) {
    dom.before(childNode, parentNode);
    dom.append(parentNode, childNode);
    return parentNode;
  }, //给一个节点加上父节点，使用了包装的方法，将指定子节点包装起来，放到其原来的位置。
  remove(node) {
    return node.parentNode.removeChild(node);
  },
  empty(node) {
    let arr = [];
    let detect = node.firstChild;
    while (detect) {
      arr.push(dom.remove(detect));
      detect = node.firstChild;
    }
    return arr;
  },
  attr(node, attrName, attrValue) {
    if (arguments.length === 2) {
      return node.getAttribute(attrName);
    } else if (arguments.length === 3) {
      node.setAttribute(attrName, attrValue);
    }
  }, //该属性可以查询节点属性，也可以修改节点的属性, 属性名与值须为字符串形式

  // text(node, string) {
  //   if (arguments.length === 1) {
  //     return node.textContent;
  //   } else if (arguments.length === 2) {
  //     node.innerText = string;
  //   }
  // },

  text(node, string) {
    if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    } else if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    }
  }, //兼容式写法
  html(node, string) {
    if (arguments.length === 1) {
      return node.innerHTML;
    } else if (arguments.length === 2) {
      node.innerHTML = string;
    }
  },
  style(node, styleName, styleValue) {
    if (arguments.length === 2) {
      if (typeof styleName === "object") {
        for (let key in styleName) {
          if (key && styleName.hasOwnProperty(key)) {
            node.style[key] = styleName[key];
          }
        }
      } else if (typeof styleName === 'string') {
        return node.style[styleName];
      }
    } else if (arguments.length === 3) {
      node.style[styleName] = styleValue;
    }
  },  //注意考虑周全
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  on(node, eventName, callback) {
    node.addEventListener(eventName, callback);
  },
  off(node, eventName, callback) {
    node.removeEventListener(eventName, callback);
  },
  parent(node) {
    return node.parentNode;
  },
  children(parent) {
    return parent.children;
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  }, //trick
  next(node) {
    return node.nextElementSibling;
  },

  // next(node) {
  //   let result = node.nextSibling;
  //   if (result && (result.nodeType === 1 || result.nodeType === 3)) {
  //     return result;
  //   }
  // },   //test

  previous(node) {
    return node.previousElementSibling;
  },
  each(nodeList, callback) {
    for (let key in nodeList) {
      if (nodeList[key] instanceof HTMLElement) {
      callback(nodeList[key]);
      }
    }
  },
  index(node) {
    let nodeList = dom.children(node.parentNode);
    if (nodeList) {
      for (let i = 0; i < nodeList.length; i++) {
        if (nodeList[i] === node) {
          return i;
        }
      }
    }
  },
};
