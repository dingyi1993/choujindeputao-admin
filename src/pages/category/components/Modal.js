import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal } from 'antd'

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
}
@Form.create()
class CategoryModal extends PureComponent {
  handleOk = () => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        _id: item._id,
      }
      onOk(data)
    })
  }

  render() {
    const { item = {}, onOk, form, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
        <Form.Item label={'id'} {...formItemLayout}>
            {getFieldDecorator('id', {
              initialValue: item.id,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label={'名称'} {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

CategoryModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default CategoryModal
