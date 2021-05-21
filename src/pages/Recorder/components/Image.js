import React, {useState, useEffect} from 'react';
import {Tooltip} from 'antd'
import {
    DeleteFilled,
    PictureFilled,
  } from '@ant-design/icons';

import '../App.css';

const Image = (props) =>{

    const {handleRemoveImage, setImage, src} = props

    const [showOptions, setShowOptions] = useState(false)
    const [className, setClassName] = useState('thumbnail')
    const [tooltip, setTooltip] = useState(false)

    const onDelete = () =>{
        var temp = 'thumbnail shrink'
        setTooltip(false)
        setClassName(temp)
        setTimeout(()=>{
            handleRemoveImage(src)
        }, 1000)
    }

    return <div className={className}
                onMouseEnter={()=>setShowOptions(true)}
                onMouseLeave={()=>{
                    setTooltip(false)
                    setShowOptions(false)
                }}
            >
        <div className="thumbCloud" style={{opacity: showOptions ? 0.7 : 0}}/>
        <div className="thumbOpts" style={{opacity: showOptions ? 1 : 0}}>
                <Tooltip title="View" overlayStyle={{zIndex: 10}}>
                    <PictureFilled style={{marginRight: 10}} onClick={()=>setImage(src)}/>
                </Tooltip>
                <Tooltip title="Delete" visible={tooltip}>
                    <DeleteFilled onClick={onDelete} onMouseEnter={()=>setTooltip(true)} onMouseLeave={()=>setTooltip(false)}/>
                </Tooltip>
            </div>
        <img src={src} style={{width: 100}}/>
    </div>

};

export default Image;
