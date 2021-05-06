import React from 'react';
import {Button, Tooltip, Popconfirm} from 'antd'
import {
    DownloadOutlined,
    CameraOutlined,
    PictureOutlined,
    ClearOutlined,
    VideoCameraOutlined
  } from '@ant-design/icons';
import '../App.css';

const ButtonGroup = (props) =>{

    const {images, onScreenshot, onDownload, onBurst, onVideo, endVideo, isRecording, deleteAllMedia} = props;

    var downloadTooltip = 'Download';

    if (images.length > 1 ) {
        downloadTooltip = 'Download All';
    }

    return <div className='buttonGroup'>
        <div style={{width: '99%', display: 'flex', justifyContent: 'center'}}>
        <Tooltip title="Burst">
            <Button shape="circle" onClick={onBurst}>
                <PictureOutlined className='burst' style={{marginLeft: 0}}/>
                <PictureOutlined className='burst' style={{marginLeft: 5}}/>
                <PictureOutlined className='burst' style={{marginLeft: 10}}/>
            </Button>
        </Tooltip>
        <Tooltip title="Photo">
            <Button shape="circle" onClick={onScreenshot} style={{margin: '0 10px 0 10px'}}>
                <CameraOutlined/>
            </Button>
        </Tooltip>
        <Tooltip title="Video">
            <Button shape="circle" onClick={isRecording ? endVideo : onVideo} type={isRecording ? 'danger' : 'default'}>
                {!isRecording
                    ? <VideoCameraOutlined style={{margin: '5px 0 0 3px'}}/>
                    : <div style={{width: 20, height: 20, borderRadius: "50%", backgroundColor: 'white'}}></div>}
            </Button>
        </Tooltip>
        </div>
        {images.length > 0
        ? <div>
            <Tooltip title={downloadTooltip}>
                <Button shape="circle" style={{marginRight: 10}} onClick={()=>onDownload(null)}>
                    <DownloadOutlined/>
                </Button>
            </Tooltip>
            <Popconfirm title="Are you sure?" onConfirm={deleteAllMedia}>
                <Tooltip title='Clear All' overlayStyle={{zIndex: 10}}>
                    <Button shape="circle">
                        <ClearOutlined />
                    </Button>
                </Tooltip>
            </Popconfirm>
        </div>
        : null
        }
    </div>

};

export default ButtonGroup;
