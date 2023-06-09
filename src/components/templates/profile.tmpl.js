import Handlebars from 'handlebars';

export const profileTemplate = Handlebars.compile(
  `<div class="centeredContainer">
      <form class="form">
        <h3>{{ formTitle }}</h3>
        {{#each fields}}
        {{> formField }}
        {{/each}}
        {{> button }}
        {{> link }}
      </form>
  </div>`
);
