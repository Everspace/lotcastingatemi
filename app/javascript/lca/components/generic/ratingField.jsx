import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'

import { clamp } from '../../utils/'

const styles = theme => ({
  field: {
    width: '4em',
    marginRight: theme.spacing.unit,
  }
})

// TODO Special fields for x/y resources like mote/willpower pools
class RatingField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value,
      min: this.props.min || 0,
      max: this.props.max || Infinity,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      value: newProps.value,
      min: newProps.min || 0,
      max: newProps.max || Infinity,
    })
  }

  handleChange(e) {
    const { min, max } = this.state
    let value = clamp(parseInt(e.target.value), min, max)
    const fakeE = { target: { name: e.target.name, value: value }}

    this.props.onChange(fakeE)
  }

  render() {
    const { trait, label, classes } = this.props
    const { handleChange } = this
    const { value, min, max } = this.state

    return <TextField className={ classes.field }
      type="number" inputProps={{ min: min, max: max }}
      name={ trait } label={ label } value={ value }
      onChange={ handleChange } margin={ this.props.margin || 'none' }
    />
  }
}

RatingField.propTypes = {
  trait: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  margin: PropTypes.string,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RatingField)
