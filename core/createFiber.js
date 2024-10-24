import {
  ClassComponent,
  Fragment,
  FunctionComponent,
  HostComponent,
  HostText,
} from './ReactWorkTags.js';
import { isFn, isStr, isUndefined, Placement } from './utils.js';

/**
 * 1. 创建 fiber 对象，初始化各种属性。
 * 2. 根据 jsxElement.type 的类型判断组件的种类。
 * 3. 根据判断结果设置 fiber.tag。
 * 4. 返回创建好的 fiber 对象。
 */
export function createFiber(jsxElement, returnFiber) {
  const fiber = {
    // 类型
    type: jsxElement.type,
    key: jsxElement.key,
    // 属性
    props: jsxElement.props,
    // 不同类型的组件， stateNode也不同
    // 原生标签 dom节点
    // class 实例
    stateNode: null,

    // 第一个子fiber
    child: null,
    // 下一个兄弟节点
    sibling: null,
    return: returnFiber,

    flags: Placement,

    // 记录节点在当前层级下的位置
    index: null,
  };
  
  const { type } = jsxElement;
  /**
   * 根据 jsxElement.type 的类型设置 fiber.tag：
   * 1. 如果是字符串，设置为 HostComponent（原生 DOM 元素）
   * 2. 如果是函数，判断是类组件还是函数组件
   * 3. 如果是 undefined，设置为 HostText（文本节点）
   * 4. 其他情况设置为 Fragment
   */
  if (isStr(type)) {
    fiber.tag = HostComponent;
  } else if (isFn(type)) {
    // todo 函数以及类组件
    fiber.tag = type.prototype.isReactComponent
      ? ClassComponent
      : FunctionComponent;
  } else if (isUndefined(type)) {
    fiber.tag = HostText;
    fiber.props = { children: jsxElement };
  } else {
    fiber.tag = Fragment;
  }

  return fiber;
}
