import React from 'react'

const Modal = ({ id, title, onSave, errorMessage, children }) => {
  const saveHandler = () => {
    if (onSave) onSave()
  }
  return (
    <div className='modal fade' id={id} tabIndex='-1'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              {title}
            </h5>
            <button className='close' data-dismiss='modal'>
              <span>&times;</span>
            </button>
          </div>

          <div className='modal-body'>{children}</div>

          <div className='modal-footer'>
            <h5 className='text-danger'>{errorMessage}</h5>
            <button
              type='button'
              className='btn btn-secondary'
              data-dismiss='modal'
            >
              Cancelar
            </button>
            <button
              type='button'
              className='btn btn-success'
              onClick={saveHandler}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
