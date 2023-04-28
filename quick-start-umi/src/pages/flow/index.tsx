import type { IAppLoad } from '@antv/xflow'
import React, { useRef, useEffect } from 'react'
/** 交互组件 */
import {
  /** XFlow核心组件 */
  XFlow,
  /** 流程图画布组件 */
  FlowchartCanvas,
  /** 流程图配置扩展 */
  FlowchartExtension,
  /** 流程图节点组件 */
  FlowchartNodePanel,
  /** 流程图表单组件 */
  FlowchartFormPanel,
  /** 通用组件：快捷键 */
  KeyBindings,
  /** 通用组件：画布缩放 */
  CanvasScaleToolbar,
  /** 通用组件：右键菜单 */
  CanvasContextMenu,
  /** 通用组件：工具栏 */
  CanvasToolbar,
  /** 通用组件：对齐线 */
  CanvasSnapline,
  /** 通用组件：节点连接桩 */
  CanvasNodePortTooltip,
  createHookConfig,
  DisposableCollection,
} from '@antv/xflow'
import type { Graph } from '@antv/x6'
/** 配置Command*/
import { useCmdConfig } from './config-cmd'
/** 配置Menu */
import { useMenuConfig } from './config-menu'
/** 配置Toolbar */
import { useToolbarConfig } from './config-toolbar'
/** 配置快捷键 */
import { useKeybindingConfig } from './config-keybinding'
/** 配置Dnd组件面板 */
import { DndNode } from './react-node/dnd-node'

import './index.less'
import '@antv/xflow/dist/index.css';
import 'antd/dist/antd.css';

export interface IProps {
  meta: { flowId: string }
}

export const Demo: React.FC<IProps> = props => {
  const { meta } = props
  const toolbarConfig = useToolbarConfig()
  const menuConfig = useMenuConfig()
  const keybindingConfig = useKeybindingConfig()
  const graphRef = useRef<Graph>()
  const commandConfig = useCmdConfig()
  /**
   * @param app 当前XFlow工作空间
   * @param extensionRegistry 当前XFlow配置项
   */

  const useGraphHookConfig = createHookConfig(config => {
    config.setRegisterHook(hooks => {
      const disposableList = [
        // 注册修改graphOptions配置的钩子
        hooks.graphOptions.registerHook({
          name: 'custom-x6-options',
          handler: async options => {
            options.connecting = {
              ...options.connecting,
              allowBlank: false,
              snap: true,
              allowMulti: false,
              highlight: true,
              validateConnection: ({ targetMagnet }) => {
                if (!targetMagnet) {
                  return false
                }
                if (targetMagnet.getAttribute('port-group') !== 'in') {
                  return false
                }
                return true
              }
            }
          },
        }),
      ]
      const toDispose = new DisposableCollection()
      toDispose.pushAll(disposableList)
      return toDispose
    })
  });

  const onLoad: IAppLoad = async app => {
    graphRef.current = await app.getGraphInstance()
  }

  const graphHooksConfig = useGraphHookConfig(props)
  console.log(graphHooksConfig, 'graphHooksConfig')
  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.on('node:click', (...arg) => {
        console.log(arg, 'click')
      })
    }
  }, [graphRef])

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <XFlow
        hookConfig={graphHooksConfig}
        className="flow-user-custom-clz"
        commandConfig={commandConfig}
        onLoad={onLoad}
        meta={meta}
      >
        <FlowchartExtension />
        <FlowchartNodePanel
          showOfficial={false}
          showHeader={false}
          defaultActiveKey={["custom"]}
          registerNode={{
            title: '自定义节点',
            key: 'custom',
            nodes: [
              {
                component: DndNode,
                popover: () => <div>自定义节点</div>,
                name: 'custom-node-indicator',
                width: 210,
                height: 130,
                label: '自定义节点',
                ports: {
                  items: [
                    {
                      id: 'a',
                      group: 'in',
                      args: { x: 0, y: 60 },
                      attrs: {
                        circle: {
                          r: 6,
                          magnet: true,
                          stroke: '#31d0c6',
                          fill: '#fff',
                          strokeWidth: 2,
                        },
                      },
                    },
                    {
                      id: 'b',
                      group: 'out',
                      args: { x: 210, y: 60 },
                      attrs: {
                        circle: {
                          r: 6,
                          magnet: true,
                          stroke: '#31d0c6',
                          fill: '#fff',
                          strokeWidth: 2,
                        },
                      },
                    },
                    // {
                    //   id: 'b1',
                    //   group: 'group1',
                    //   args: { x: 200, y: 60 },
                    //   attrs: {
                    //     circle: {
                    //       r: 6,
                    //       magnet: true,
                    //       stroke: '#31d0c6',
                    //       fill: '#fff',
                    //       strokeWidth: 2,
                    //     },
                    //   },
                    // },
                    // {
                    //   id: 'b2',
                    //   group: 'group1',
                    //   args: { x: 220, y: 60 },
                    //   attrs: {
                    //     circle: {
                    //       r: 6,
                    //       magnet: true,
                    //       stroke: '#31d0c6',
                    //       fill: '#fff',
                    //       strokeWidth: 2,
                    //     },
                    //   },
                    // },
                  ],
                  groups: {
                    in: {
                      position: 'absolute',
                      // attrs: {
                      //   portBody: {
                      //     // magnet: 'passive',
                      //     r: 6,
                      //     stroke: '#5F95FF',
                      //     fill: '#fff',
                      //     strokeWidth: 1,
                      //   },
                      // },
                    },
                    out: {
                      position: 'absolute',
                      // attrs: {
                      //   portBody: {
                      //     // magnet: true,
                      //     r: 6,
                      //     fill: '#fff',
                      //     stroke: '#5F95FF',
                      //     strokeWidth: 1,
                      //   },
                      // },
                    },
                    group1: {
                      position: 'absolute',
                    }
                  }
                }
              },
            ],
          }}
          position={{ width: 162, top: 40, bottom: 0, left: 0 }}
        />
        <FlowchartCanvas
          edgeConfig={{
            // label: '11',
            connector: { name: 'smooth' },
            attrs: {
              // https://x6.antv.vision/zh/docs/tutorial/basic/edge/#%E5%AE%9A%E5%88%B6%E6%A0%B7%E5%BC%8F-attrs
              line: {
                stroke: '#A2B1C3',
                strokeWidth: 1,
                targetMarker: {
                  name: 'classic',
                  size: 7,
                },
              },
            }
          }}
          onAddEdge={() => {
            console.log('新增了一条边')
          }} position={{ top: 40, left: 0, right: 0, bottom: 0 }}>
          <CanvasScaleToolbar
            layout="horizontal"
            position={{ top: -40, right: 0 }}
            style={{
              width: 150,
              left: 'auto',
              height: 39,
            }}
          />
          <CanvasContextMenu config={menuConfig} />
          {/* <CanvasSnapline color="red" /> */}
          {/* <CanvasNodePortTooltip /> */}
        </FlowchartCanvas>
        {/* <FlowchartFormPanel show={true} position={{ width: 200, top: 40, bottom: 0, right: 0 }} /> */}
        <KeyBindings config={keybindingConfig} />
      </XFlow>
    </div>
  )
}

export default Demo
