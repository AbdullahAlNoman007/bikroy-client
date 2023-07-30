import React from 'react';

const ConfirmModal = ({setAdStatus,handleAd,adData}) => {
    return (
        <div>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Advertised</h3>
                    <p className="py-4">Are you want to put this product into Advertised section?</p>
                    <div className="modal-action">
                        <label onClick={()=>handleAd(adData)} htmlFor="my_modal_6" className="btn btn-sm btn-primary">Advertised</label>
                        <label onClick={()=>setAdStatus(null)} htmlFor="my_modal_6" className="btn btn-sm btn-accent">Close!</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;