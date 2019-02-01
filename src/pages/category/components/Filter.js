import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input, Select } from 'antd'

@Form.create()
class Filter extends PureComponent {
  handleFields = fields => {
    return fields
  }

  handleSubmit = () => {
    const { onFilterChange, form } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  handleReset = () => {
    const { form } = this.props
    const { getFieldsValue, setFieldsValue } = form

    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
  }
  handleChange = (key, values) => {
    const { form, onFilterChange } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields[key] = values
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  render() {
    const { onAdd, filter, form } = this.props
    const { getFieldDecorator } = form
    const { name } = filter

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item label="名称">
          {getFieldDecorator('name', { initialValue: name })(
            <Input placeholder="查找名称" />
          )}
        </Form.Item>
        {/* <Form.Item label="状态">
          {getFieldDecorator('status', { initialValue: status && Number(status) })(
            <Select allowClear placeholder="选择状态" style={{ width: 100 }}>
              {[{ name: '有效', value: 1 }, { name: '失效', value: 2 }].map(item => <Select.Option key={item.value} value={item.value}>{item.name}</Select.Option>)}
            </Select>
          )}
        </Form.Item> */}
        <Form.Item><Button type="primary" onClick={this.handleSubmit}>搜索</Button></Form.Item>
        <Form.Item><Button onClick={this.handleReset}>重置</Button></Form.Item>
        <Form.Item><Button type="ghost" onClick={onAdd}>创建</Button></Form.Item>
      </Form>
    )
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter
