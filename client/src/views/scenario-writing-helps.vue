<!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ~ Copyright (C) 2019 by the ARA Contributors
  ~
  ~ Licensed under the Apache License, Version 2.0 (the "License");
  ~ you may not use this file except in compliance with the License.
  ~ You may obtain a copy of the License at
  ~
  ~ 	 http://www.apache.org/licenses/LICENSE-2.0
  ~
  ~ Unless required by applicable law or agreed to in writing, software
  ~ distributed under the License is distributed on an "AS IS" BASIS,
  ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  ~
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
<template>
  <Spin fix v-if="loadingCommunications"/>
  <div v-else>
    <Collapse v-model="activePanelName" accordion v-if="howtoContent && howtoContent.message">
      <Panel name="help">
        <Icon type="md-help-circle"/> WHERE TO EDIT OR ADD A SCENARIO?
        <div slot="content">
          <span v-if="howtoContent.type === 'HTML'" v-html="howtoContent.message"/>
          <span v-else>{{howtoContent.message}}</span>
        </div>
      </Panel>
    </Collapse>
    <div v-if="content && content.message">
      <div v-if="content.type === 'HTML'" v-html="content.message"/>
      <div v-else>{{content.massage}}</div>
    </div>
    <div slot="content" v-else>
      Please configure information in MANAGEMENT &gt; COMMUNICATIONS.
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import api from '../libs/api'

  export default {
    name: 'scenario-writing-helps',

    data () {
      return {
        activePanelName: null,
        loadingCommunications: false,
        content: null,
        howtoContent: null
      }
    },

    methods: {
      loadCommunications () {
        this.loadingCommunications = true
        Vue.http
          .get(api.paths.communications(this), api.REQUEST_OPTIONS)
          .then((response) => {
            this.loadingCommunications = false
            for (let item of response.body) {
              if (item.code === 'scenario-writing-helps') {
                this.content = item
              } else if (item.code === 'howto-add-scenario') {
                this.howtoContent = item
              }
            }
          }, (error) => {
            this.loadingCommunications = false
            api.handleError(error)
          })
      }
    },

    mounted () {
      this.loadCommunications()
    },

    watch: {
      '$route' () {
        this.loadCommunications()
      }
    }
  }
</script>

<style scoped>
  .ivu-collapse {
    margin-bottom: 16px;
  }
</style>
