// @flow
import * as React from 'react'

import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import type { withMotePool } from 'utils/flow-types'

type Props = { character: withMotePool, onChange: Function }
const AnimaSelect = ({ character, onChange }: Props) => {
  const options: React.Node = [
    <MenuItem key={0} value={0}>
      Dim
    </MenuItem>,
    <MenuItem key={1} value={1}>
      Glowing
    </MenuItem>,
    <MenuItem key={2} value={2}>
      Burning
    </MenuItem>,
    <MenuItem key={3} value={3}>
      Bonfire
    </MenuItem>,
  ]
  return (
    <TextField
      select
      name="anima_level"
      value={character.anima_level}
      label="Anima"
      margin="dense"
      onChange={onChange}
    >
      {options}
    </TextField>
  )
}
export default AnimaSelect
