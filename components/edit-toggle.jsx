import React from 'react'

const EditToggle = ({toggleEdit, isEdit}) => {
  return (
    <div className='editable-field__edit-toggle' onClick={toggleEdit}>
      {isEdit ? 'Stop Editing' : 'Start Editing'}
    </div>
  )
}

EditToggle.PropTypes = {
  toggleEdit: React.PropTypes.func,
  isEdit: React.PropTypes.bool
}

export default EditToggle
