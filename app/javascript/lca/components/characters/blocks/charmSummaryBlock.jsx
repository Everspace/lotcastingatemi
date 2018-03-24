import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import Launch from 'material-ui-icons/Launch'

import BlockPaper from '../../generic/blockPaper.jsx'
import { fullChar } from '../../../utils/propTypes'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit / 2,
    marginBottom: theme.spacing.unit / 2,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
  },
  bodyWrap: {
  },
  body: {
    flex: 1,
    minWidth: '10em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'noWrap',
    [theme.breakpoints.down('md')]: { minWidth: '100%' },
  },
  name: { ...theme.typography.body2,
    fontSize: '1rem',
    marginRight: theme.spacing.unit / 2,

  },
  info: { ...theme.typography.caption,
    textTransform: 'capitalize',
    marginRight: theme.spacing.unit / 2,
  }
})

function _SingleCharm({ charm, classes }) {
  return <React.Fragment>
    <Typography component="div" className={ classes.root }>
      <div className={ classes.name }>
        { charm.name }
      </div>
      <div className={ classes.info }>(
        { charm.cost && charm.cost != '-' &&
          charm.cost + ', '
        }
        { charm.timing }
        { charm.duration &&
          ', ' + charm.duration
        }
        { charm.keywords.length > 0 &&
          ', keywords: ' + charm.keywords.join(', ')
        }
      )</div>
      <div className={ classes.body }>{ charm.body }</div>
    </Typography>

    <Divider />
  </React.Fragment>
}
_SingleCharm.propTypes = {
  charm: PropTypes.object,
  classes: PropTypes.object,
}
const SingleCharm = withStyles(styles)(_SingleCharm)

function _SingleSpell({ spell, classes }) {
  return <React.Fragment>
    <Typography className={ classes.root }>
      <div className={ classes.name }>
        { spell.name }
      </div>
      <div className={ classes.info }>{ spell.control && '(Control Spell) ' }
        (
        { spell.cost },&nbsp;
        { spell.duration }
        { spell.keywords.length > 0 &&
          ', keywords: ' + spell.keywords.join(', ')
        }
        )
      </div>
      <div className={ classes.body }>{ spell.body }</div>
    </Typography>
    <Divider />
  </React.Fragment>
}
_SingleSpell.propTypes = {
  spell: PropTypes.object,
  classes: PropTypes.object,
}
const SingleSpell = withStyles(styles)(_SingleSpell)

function CharmSummaryBlock(props) {
  const { character, nativeCharms, martialArtsCharms, evocations, spiritCharms, spells } = props

  // Mortals don't need Charms displayed
  if (character.type == 'Character' ) {
    return <div />
  }

  const natives = nativeCharms.map((c) =>
    <SingleCharm key={ c.id } charm={ c } character={ character } />
  )
  const maCharms = martialArtsCharms.map((c) =>
    <SingleCharm key={ c.id } charm={ c } character={ character } />
  )
  const evo = evocations.map((c) =>
    <SingleCharm key={ c.id } charm={ c } character={ character } />
  )
  const spirit = spiritCharms.map((c) =>
    <SingleCharm key={ c.id } charm={ c } character={ character } />
  )
  const spl = spells.map((c) =>
    <SingleSpell key={ c.id } spell={ c } character={ character } />
  )


  return <BlockPaper>
    <Typography variant="title" gutterBottom
      component={ Link } to={ `/characters/${character.id}/charms` }
      style={{ textDecoration: 'none', }}
    >
      Charms&nbsp;&nbsp;
      <Launch style={{ verticalAlign: 'bottom' }} />
    </Typography>
    { natives }
    { maCharms }
    { evo }
    { spirit }
    { spl }
  </BlockPaper>
}
CharmSummaryBlock.propTypes = {
  character: PropTypes.shape(fullChar),
  nativeCharms: PropTypes.arrayOf(PropTypes.object),
  martialArtsCharms: PropTypes.arrayOf(PropTypes.object),
  evocations: PropTypes.arrayOf(PropTypes.object),
  spiritCharms: PropTypes.arrayOf(PropTypes.object),
  spells: PropTypes.arrayOf(PropTypes.object),
}

function mapStateToProps(state, ownProps) {
  const { character } = ownProps
  let evocations = []
  let martialArtsCharms = []
  let nativeCharms = []
  let spiritCharms = []
  let spells = []

  if (character.charms != undefined) {
    nativeCharms = character.charms.map((id) => state.entities.charms[id])
  }
  if (character.evocations != undefined) {
    evocations = character.evocations.map((id) => state.entities.charms[id])
  }
  if (character.martial_arts_charms != undefined) {
    martialArtsCharms = character.martial_arts_charms.map((id) => state.entities.charms[id])
  }
  if (character.spirit_charms != undefined) {
    spiritCharms = character.spirit_charms.map((id) => state.entities.charms[id])
  }
  if (character.spells != undefined) {
    spells = character.spells.map((id) => state.entities.spells[id])
  }

  return {
    nativeCharms,
    martialArtsCharms,
    evocations,
    spiritCharms,
    spells,
  }
}

export default connect(
  mapStateToProps
)(CharmSummaryBlock)
