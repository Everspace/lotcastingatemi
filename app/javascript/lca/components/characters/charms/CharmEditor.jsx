import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import ContentAddCircle from 'material-ui-icons/AddCircle'
import Filter from 'material-ui-icons/FilterList'

import CharmFields from './CharmFields.jsx'
import CharmFilter from './CharmFilter.jsx'
import SpellFields from './SpellFields.jsx'
import {
  updateCharm, createCharm, destroyCharm,
  updateSpell, createSpell, destroySpell,
} from '../../../ducks/actions.js'
import {
  getSpecificCharacter, getMeritsForCharacter, getNativeCharmsForCharacter,
  getMartialArtsCharmsForCharacter, getEvocationsForCharacter,
  getSpellsForCharacter, getSpiritCharmsForCharacter,
  getAllAbilitiesWithCharmsForCharacter,
} from '../../../selectors/'

class CharmEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = { charmFilter: '' }

    this.setFilter = this.setFilter.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleAddNative = this.handleAddNative.bind(this)
    this.handleAddMA = this.handleAddMA.bind(this)
    this.handleAddEvocation = this.handleAddEvocation.bind(this)
    this.handleAddSpirit = this.handleAddSpirit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleUpdateSpell = this.handleUpdateSpell.bind(this)
    this.handleAddSpell = this.handleAddSpell.bind(this)
    this.handleRemoveSpell = this.handleRemoveSpell.bind(this)
  }

  setFilter(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleUpdate(id, charId, trait, value) {
    this.props._handleUpdate(id, charId, trait, value)
  }

  handleUpdateSpell(id, charId, trait, value) {
    this.props._handleUpdateSpell(id, charId, trait, value)
  }

  handleAddNative() {
    let type
    switch(this.props.character.type) {
    case 'SolarCharacter':
      type = 'SolarCharm'
      break
    case 'DragonbloodCharacter':
      type = 'DragonbloodCharm'
      break
    case 'CustomAbilityCharacter':
      type = 'CustomAbilityCharm'
      break
    case 'CustomAttributeCharacter':
      type = 'CustomAttributeCharm'
      break
    case 'CustomEssenceCharacter':
      type = 'CustomEssenceCharm'
      break
    default:
      type = ''
    }
    this.props._handleCreate(this.props.character.id, type)
  }

  handleAddMA() {
    this.props._handleCreate(this.props.character.id, 'MartialArtsCharm')
  }

  handleAddEvocation() {
    this.props._handleCreate(this.props.character.id, 'Evocation')
  }

  handleAddSpirit() {
    this.props._handleCreate(this.props.character.id, 'SpiritCharm')
  }

  handleAddSpell() {
    this.props._handleCreateSpell(this.props.character.id)
  }

  handleRemove(id) {
    this.props._handleDestroy(id, this.props.character.id)
  }

  handleRemoveSpell(id){
    this.props._handleDestroySpell(id, this.props.character.id)
  }

  render() {
    /* Escape hatch */
    if (this.props.character == undefined)
      return <div>
        <Typography paragraph>This Character has not yet loaded.</Typography>
      </div>

    const {
      character, nativeCharms, abilities, martialArtsCharms, evocations,
      spiritCharms, spells
    } = this.props
    const {
      handleUpdate, handleRemove, handleUpdateSpell, handleRemoveSpell,
      handleAddNative, handleAddMA, handleAddEvocation, handleAddSpell, handleAddSpirit
    } = this
    const { charmFilter } = this.state

    let natives = []
    let maCharms = []
    let evo = []
    let spirit = []
    let spl = []

    if (this.state.charmFilter === '')
      natives = nativeCharms.map((c) =>
        <Grid item xs={ 12 } md={ 6 } key={ c.id }>
          <CharmFields charm={ c } character={ character }
            onUpdate={ handleUpdate } onRemove={ handleRemove }
          />
        </Grid>
      )
    else
      natives = nativeCharms.filter((c) => c.ability === charmFilter).map((c) =>
        <Grid item xs={ 12 } md={ 6 } key={ c.id }>
          <CharmFields charm={ c } character={ character }
            onUpdate={ handleUpdate } onRemove={ handleRemove }
          />
        </Grid>
      )
    maCharms = martialArtsCharms.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <CharmFields charm={ c } character={ character }
          onUpdate={ handleUpdate } onRemove={ handleRemove }
        />
      </Grid>
    )
    evo = evocations.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <CharmFields charm={ c } character={ character }
          onUpdate={ handleUpdate } onRemove={ handleRemove }
        />
      </Grid>
    )
    spirit = spiritCharms.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <CharmFields charm={ c } character={ character }
          onUpdate={ handleUpdate } onRemove={ handleRemove }
        />
      </Grid>
    )
    spl = spells.map((c) =>
      <Grid item xs={ 12 } md={ 6 } key={ c.id }>
        <SpellFields spell={ c } character={ character }
          onUpdate={ handleUpdateSpell } onRemove={ handleRemoveSpell }
        />
      </Grid>
    )

    return <div>
      <Grid container spacing={ 24 }>
        { character.type != 'Character' && <Fragment>
          <Grid item xs={ 12 }>
            <Typography variant="headline">
              Charms
              &nbsp;&nbsp;

              <Button onClick={ handleAddNative }>
                Add Charm&nbsp;
                <ContentAddCircle />
              </Button>


              <CharmFilter abilities={ abilities } filter={ charmFilter }
                name="charmFilter" onChange={ this.setFilter }
              />
            </Typography>
          </Grid>
          { natives }

          <Grid item xs={ 12 }>
            <Typography variant="headline">
              Martial Arts
              &nbsp;&nbsp;

              <Button onClick={ handleAddMA }>
                Add MA Charm&nbsp;
                <ContentAddCircle />
              </Button>
            </Typography>
          </Grid>
          { maCharms }

          <Grid item xs={ 12 }>
            <Typography variant="headline">
              Evocations
              &nbsp;&nbsp;

              <Button onClick={ handleAddEvocation }>
                Add Evocation&nbsp;
                <ContentAddCircle />
              </Button>
            </Typography>
          </Grid>
          { evo }

          <Grid item xs={ 12 }>
            <Typography variant="headline">
              Spirit Charms
              &nbsp;&nbsp;

              <Button onClick={ handleAddSpirit }>
                Add Spirit Charm&nbsp;
                <ContentAddCircle />
              </Button>
            </Typography>
          </Grid>
          { spirit }
        </Fragment> }

        <Grid item xs={ 12 }>
          <Typography variant="headline">
            Spells
            &nbsp;&nbsp;

            <Button onClick={ handleAddSpell }>
              Add Spell&nbsp;
              <ContentAddCircle />
            </Button>
          </Typography>
        </Grid>
        { spl }

      </Grid>
    </div>
  }
}
CharmEditor.propTypes = {
  character: PropTypes.object,
  nativeCharms: PropTypes.arrayOf(PropTypes.object),
  abilities: PropTypes.arrayOf(PropTypes.string),
  martialArtsCharms: PropTypes.arrayOf(PropTypes.object),
  evocations: PropTypes.arrayOf(PropTypes.object),
  spells: PropTypes.arrayOf(PropTypes.object),
  spiritCharms: PropTypes.arrayOf(PropTypes.object),
  _handleCreate: PropTypes.func,
  _handleUpdate: PropTypes.func,
  _handleDestroy: PropTypes.func,
  _handleCreateSpell: PropTypes.func,
  _handleUpdateSpell: PropTypes.func,
  _handleDestroySpell: PropTypes.func,
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.characterId
  const character = getSpecificCharacter(state, id)

  let nativeCharms = []
  let abilities = []
  let martialArtsCharms = []
  let evocations = []
  let artifacts = []
  let spiritCharms = []
  let spells = []

  if (character !== undefined) {
    nativeCharms = getNativeCharmsForCharacter(state, id)
    abilities = getAllAbilitiesWithCharmsForCharacter(state, id)
    martialArtsCharms = getMartialArtsCharmsForCharacter(state, id)
    evocations = getEvocationsForCharacter(state, id)
    spells = getSpellsForCharacter(state, id)
    spiritCharms = getSpiritCharmsForCharacter(state, id)
    artifacts = getMeritsForCharacter(state, id).filter((m) =>
      m.merit_name.toLowerCase() == 'artifact' || m.merit_name.toLowerCase() == 'hearthstone' || m.merit_name.toLowerCase() == 'warstrider'
    )
  }

  return {
    character,
    nativeCharms,
    abilities,
    martialArtsCharms,
    evocations,
    artifacts,
    spells,
    spiritCharms,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    _handleUpdate: (id, charId, trait, value) => {
      dispatch(updateCharm(id, charId, trait, value))
    },
    _handleDestroy: (id, charId) => {
      dispatch(destroyCharm(id, charId))
    },
    _handleCreate: (charId, type) => {
      dispatch(createCharm(charId, type))
    },
    _handleUpdateSpell: (id, charId, trait, value) => {
      dispatch(updateSpell(id, charId, trait, value))
    },
    _handleDestroySpell: (id, charId) => {
      dispatch(destroySpell(id, charId))
    },
    _handleCreateSpell: (charId) => {
      dispatch(createSpell(charId))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharmEditor)
