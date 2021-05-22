import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { SettingOutlined,
    ToolOutlined,
    PictureOutlined,
    FieldTimeOutlined,
    ApiOutlined,
    DisconnectOutlined
} from '@ant-design/icons';
import {Drawer, Collapse, Card, Select, InputNumber, Tooltip} from 'antd'
import {
    // setFormat, setBurst, setBurstRate, setEnableFeed,
    updateSettings} from '../actions'
import "antd/dist/antd.css";
import '../App.css';
const { Panel } = Collapse;
const Option = Select.Option;

const formats = [{val:'.png', name: 'PNG'}, {val:'.jpeg', name: 'JPEG'}, {val:'.jpg', name: 'JPG'}, {val:'.tiff', name: 'TIFF'}]

const Menu = (props) => {

    const [showMenu, setShowMenu] = useState(false)

    const settings = useSelector(state => state.settings);
    const dispatch = useDispatch();

    const {burst, burstRate, enableFeed, format} = settings;

    const itemStyle={
        padding: '10px 0 10px 0',
        overflowX: 'hidden'
    }

    const handleDrawer = (x) =>{
        setShowMenu(x)
    };

    const handleCut = () =>{
        setShowMenu(false)
        dispatch(updateSettings({enableFeed: !enableFeed}))
    };

    return (<Card className="menu">
        <h1>Dashboard</h1>
        <div>
        <Tooltip title="Settings" placement="left"><SettingOutlined style={{fontSize: 25, cursor: 'pointer'}} onClick={()=>handleDrawer(!showMenu)}/> </Tooltip>
        <Drawer
            title="Settings"
            placement="right"
            closable={false}
            onClose={()=>handleDrawer(false)}
            bodyStyle={itemStyle}
            footerStyle={itemStyle}
            visible={showMenu}
            getContainer={false}
            footer={
                <p style={{position: 'relative', padding: '0 10px 0 10px', cursor: 'pointer'}}  onClick={handleCut} >
                    {!enableFeed ? 'Start Video Feed' : 'End Video Feed'}
                    {!enableFeed ? <ApiOutlined style={{fontSize: 25}}/> : <DisconnectOutlined style={{fontSize: 25}}/> }
                </p>
            }
      >
      <Collapse accordion>
        <Panel header={<p>Formato da imagem <ToolOutlined /></p>} key="1" showArrow={false}>
        <p className='description'>Qual formato das imagens?</p>
        <Select onChange={(e)=>dispatch(updateSettings({format: e}))} defaultValue={format} style={{width: "100%"}}>
            {formats.map(form => {
                return <Option value={form.val} key={form.val}>{form.name}</Option>
            })}
        </Select>
        </Panel>
        <Panel header={<p>Quantidade de imagem/frame<span style={{position: 'relative'}}>
                <PictureOutlined className='burst' style={{marginLeft: 0, top: -4, left: -18, backgroundColor: '#fafafa'}}/>
                <PictureOutlined className='burst' style={{marginLeft: 5, top: -4, left: -18,backgroundColor: '#fafafa'}}/>
                <PictureOutlined className='burst' style={{marginLeft: 10, top: -4,left: -18, backgroundColor: '#fafafa'}}/>
            </span></p>} key="2" showArrow={false} >
            <p className='description'>Quantos fotos por clique?</p>
            <InputNumber defaultValue={burst} onChange={(e)=>dispatch(updateSettings({burst: e}))} style={{width: '100%'}}/>
        </Panel>
        <Panel header={<p>Taxa de frames <FieldTimeOutlined /></p>} key="3" showArrow={false}>
            <p className='description'>Segundos entre cada captura</p>
            <InputNumber defaultValue={burstRate} onChange={(e)=>dispatch(updateSettings({burstRate: e}))} style={{width: '100%'}}/>
        </Panel>
      </Collapse>
      </Drawer>
        </div>
    </Card>)

};

export default Menu;
