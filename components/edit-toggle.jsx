import React from 'react'

const EditToggle = ({toggleEdit, isEdit}) => {
  return (
    <a href='javascript:void(0);' className='editable-field__edit-toggle' onClick={toggleEdit}>
      {isEdit ? 'Stop Editing' : 'Start Editing'}
    </a>
  )
}

EditToggle.PropTypes = {
  toggleEdit: React.PropTypes.func,
  isEdit: React.PropTypes.bool
}

export default EditToggle
