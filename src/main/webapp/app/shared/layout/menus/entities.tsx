import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/company">
      <Translate contentKey="global.menu.entities.company" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/assessment">
      <Translate contentKey="global.menu.entities.assessment" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/candidate">
      <Translate contentKey="global.menu.entities.candidate" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/interviewer">
      <Translate contentKey="global.menu.entities.interviewer" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/role">
      <Translate contentKey="global.menu.entities.role" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/challenge">
      <Translate contentKey="global.menu.entities.challenge" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/task">
      <Translate contentKey="global.menu.entities.task" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
