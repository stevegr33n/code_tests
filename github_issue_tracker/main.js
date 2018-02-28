import Vue from 'vue';
import moment from 'moment';

Vue.config.productionTip = false;

const app = new Vue({
  el: '#app',
  data: {
    search: '',
    issues: [],
    filters: {
      selectedOption: 'title',
      options: ['title', 'user', 'state', 'labels', 'date'],
    },
    atomUrl: 'https://api.github.com/repos/ValveSoftware/Source-1-Games/issues',
  },
  beforeMount() {
    this.getAtomIssues(this.atomUrl);
  },
  methods: {
    getAtomIssues(url) {
      fetch(url)
        .then(response => response.json())
        .then((response) => {
          app.issues = response;
        });
    },
    filterTitleOrState(option) {
      return this.issues.filter((issue) => {
        const element = issue[option].toLowerCase();
        const search = this.search.toLowerCase();
        return element.includes(search);
      });
    },
    filterUser() {
      return this.issues.filter((issue) => {
        const user = issue.user.login.toLowerCase();
        const search = this.search.toLowerCase();
        return user.includes(search);
      });
    },
    filterLabels() {
      return this.issues.filter(issue => issue.labels.find((label) => {
        const labelName = label.name.toLowerCase();
        const search = this.search.toLowerCase();
        return labelName.includes(search);
      }));
    },
    filterDate() {
      return this.issues.filter((issue) => {
        const issueCreatedAt = this.formatDate(issue.created_at);
        const searchDate = this.search;
        return moment(issueCreatedAt).isAfter(searchDate);
      });
    },
    formatDate(date) {
      return moment(date).format('YYYY/MM/DD');
    },
  },
  computed: {
    filteredIssues() {
      if (!this.search) {
        return this.issues;
      }
      const option = this.filters.selectedOption;
      if (option === 'user') {
        return this.filterUser();
      } else if (option === 'labels') {
        return this.filterLabels();
      } else if (option === 'date') {
        return this.filterDate();
      }
      return this.filterTitleOrState(option);
    },
  },
  template: `
  <div class="font">
    <div class="search container">

      <div class="control filter">
        <input class="input" type="text" v-model="search" placeholder="Filter By..." />
      </div>

      <div class="select filter">
        <select v-model="filters.selectedOption" class="select container capitalize">
          <option v-for="option in filters.options" v-bind:value="option" class="capitalize">
            {{ option }}
          </option>
        </select>
      </div>

    </div>

    <div v-for="issue in filteredIssues" class="container issue">
        <div>
          <div class="title">Title
            <a class="title title-padding" v-bind:href="issue.html_url" target="_blank">{{ issue.title }}></a>
          </div> 
          
          <div>User:<span class="user-padding">{{ issue.user.login }}</span></div>
          <div class="capitalize">State:<span class="state-padding">{{ issue.state }}</span></div>
          <div>Date:<span class="date-padding">{{ formatDate(issue.created_at) }}</span></div>
          <div v-if="issue.labels.length > 0" class="label-padding capitalize">Labels:
            <div v-for="label in issue.labels" class="labels-padding">
              <div>{{ label.name }}</div>
            </div>
          </div>
        </div>
    </div>
  </div>`,
});
