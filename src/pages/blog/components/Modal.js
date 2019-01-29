import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select, Tabs } from 'antd'
// import { Editor } from 'components'
import MarkdownRenderer from 'react-markdown-renderer'

const { Option } = Select
const { TextArea } = Input
const { TabPane } = Tabs

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
}
@Form.create()
class BlogModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      md: props.item.md,
    }

    this.handleMarkdownBlur = this.handleMarkdownBlur.bind(this)
  }

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

  handleMarkdownBlur (e) {
    this.setState({ md: e.target.value })
  }

  render() {
    const { item = {}, onOk, form, categories, tags, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk} width={1000}>
        <Form layout="horizontal">
        <Form.Item label={'id'} hasFeedback {...formItemLayout}>
            {getFieldDecorator('id', {
              initialValue: item.id,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label={'标题'} {...formItemLayout}>
            {getFieldDecorator('title', {
              initialValue: item.title,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label={'分类'} {...formItemLayout}>
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
          </Form.Item>
          <Form.Item label={'标签'} {...formItemLayout}>
            {getFieldDecorator('tags', {
              initialValue: item.tags,
            })(<Select mode="multiple">
              {tags.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)}
            </Select>)}
          </Form.Item>
          <Form.Item label={'简介'} hasFeedback {...formItemLayout}>
            {getFieldDecorator('excerpt', {
              initialValue: item.excerpt,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label={'内容'} {...formItemLayout}>
            <Tabs type="card">
              <TabPane tab="markdown" key="markdown">
                {getFieldDecorator('md', {
                  initialValue: item.md,
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<TextArea rows={16} onBlur={this.handleMarkdownBlur} />)}
              </TabPane>
              <TabPane tab="预览" key="preview"><MarkdownRenderer markdown={this.state.md} options={{
                html: true,
                xhtmlOut: true,
                breaks: true,
                linkify: true,
                typographer: true,
              }} /></TabPane>
            </Tabs>
          </Form.Item>
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
