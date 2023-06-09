import Handlebars from 'handlebars';

export const profileTemplate = Handlebars.compile(
  `<div class="centeredContainer">
    <form class="form profile">
      {{{ avatar }}}
      {{#each fields}}
      {{{ this }}}
      {{/each}}
      {{{ button }}}
      {{{ link }}}
    </form>
  </div>`
);
