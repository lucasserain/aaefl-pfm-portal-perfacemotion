import React from 'react'
import {Modal, Button, Tooltip, Popconfirm} from 'antd';
import {
    DownloadOutlined,
    DeleteFilled, CloseCircleFilled
  } from '@ant-design/icons';

const ImageModal = (props) =>{

    const {visible, image, setImage, onDelete, onDownload} = props

    return <Modal
            visible={visible}
            onCancel={()=>setImage(null)}
            closeIcon={<CloseCircleFilled/>}
            footer={
            <div style={{display: 'flex', width: 200, margin: 'auto', justifyContent: 'center'}}>
            <Popconfirm title="Deletar imagem?"
                            onConfirm={onDelete}
                            okText="Delete Image"
                            overlayStyle={{zIndex: 1001}}
                >
                    <Tooltip title="Delete Image" overlayStyle={{zIndex: 1000}}>
                        <Button>
                            <DeleteFilled />
                        </Button>
                    </Tooltip>
                </Popconfirm>
                <Tooltip title="Download Image">
                    <Button>
                        <DownloadOutlined onClick={onDownload}/>
                    </Button>
                </Tooltip>
            </div>
            }
        >
        <br/>
        <img style={{width: '100%'}} src={image}/>
        </Modal>
}

export default ImageModal;



