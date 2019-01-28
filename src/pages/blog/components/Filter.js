/* global document */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, Input, Select } from 'antd'

const { Search } = Input
const { Option } = Select

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

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
    this.handleSubmit()
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
    const { onAdd, filter, form, categories } = this.props
    const { getFieldDecorator } = form
    const { name } = filter

    return (
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          {getFieldDecorator('title', { initialValue: name })(
            <Search
              placeholder="查找标题"
              onSearch={this.handleSubmit}
            />
          )}
        </Col>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          <FilterItem label="分类">
            {getFieldDecorator('category')(
              <Select>
                {(categories || []).map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
              </Select>
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          <FilterItem label="状态">
            {getFieldDecorator('status')(
              <Select allowClear placeholder="选择状态">
                {[{ name: '有效', value: 1 }, { name: '失效', value: 2 }].map(item => <Option key={item.value} value={item.value}>{item.name}</Option>)}
              </Select>
            )}
          </FilterItem>
        </Col>
        <Col
          {...TwoColProps}
          xl={{ span: 10 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
        >
          <Row type="flex" align="middle" justify="space-between">
            <div>
              <Button
                type="primary"
                className="margin-right"
                onClick={this.handleSubmit}
              >
                搜索
              </Button>
              <Button onClick={this.handleReset}>
                重置
              </Button>
            </div>
            <Button type="ghost" onClick={onAdd}>
              创建
            </Button>
          </Row>
        </Col>
      </Row>
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
