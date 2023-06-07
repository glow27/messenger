export default `<div class="centeredContainer">
    <form class="form">
      <h3>{{ formTitle }}</h3>
      {{#each fields}}
      {{> formField }}
      {{/each}}
      {{> button }}
      {{> link }}
    </form>
  </div>`;
