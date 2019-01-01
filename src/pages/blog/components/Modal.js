import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Select } from 'antd'
import { withI18n } from '@lingui/react'
// import { Editor } from 'components'

const FormItem = Form.Item

const { Option } = Select
const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
@withI18n()
@Form.create()
class BlogModal extends PureComponent {
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
    const { item = {}, onOk, form, i18n, categories, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk} style={{ width: 1000 }}>
        <Form layout="horizontal">
        <FormItem label={'id'} hasFeedback {...formItemLayout}>
            {getFieldDecorator('id', {
              initialValue: item.id,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={'标题'} {...formItemLayout}>
            {getFieldDecorator('title', {
              initialValue: item.title,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={'分类'} {...formItemLayout}>
            {getFieldDecorator('category', {
              initialValue: item.category && item.category.id,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Select>
              {categories.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>)}
          </FormItem>

          <FormItem label={'简介'} hasFeedback {...formItemLayout}>
            {getFieldDecorator('excerpt', {
              initialValue: item.excerpt,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>

          <FormItem label={'内容'} hasFeedback {...formItemLayout}>
            {getFieldDecorator('md', {
              initialValue: item.md,
              rules: [
                {
                  required: true,
                },
              ],
            })(<TextArea rows={10} />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

BlogModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default BlogModal
