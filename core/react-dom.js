import { createFiber } from './ReactFiber';

class ReactDOMRoot {
  constructor(rootObjGenFromContainer) {
    this._rootObjGenFromContainer = rootObjGenFromContainer;
  }
  // 接收jsx，用于更新渲染dom
  render(jsxElement) {
    const rootObjGenFromContainer = this._rootObjGenFromContainer;
    updateContainer(jsxElement, rootObjGenFromContainer);
  }
}
// 更新容器
function updateContainer(jsxElement, rootObjGenFromContainer) {
  // 生成fiber
  const fiber = createFiber(jsxElement, {
    type: rootObjGenFromContainer.containerInfo.nodeName.toLocaleLowerCase(),
    stateNode: rootObjGenFromContainer.containerInfo,
  });
  // 组件初次渲染
  scheduleUpdateOnFiber(fiber);
}

function createRoot(container) {
  const rootObjGenFromContainer = { containerInfo: container };
  return new ReactDOMRoot(rootObjGenFromContainer);
}

export default { createRoot };
