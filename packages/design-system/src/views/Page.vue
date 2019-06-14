<template>
  <div>
    <About v-if="isAbout"/>
    <DesignWorkflow v-if="isDesignWorkflow"/>
    <SketchPlugins v-if="isSketchPlugins"/>
    <StartCoding v-if="isStartCoding"/>
    <Updates v-if="isUpdates"/>
    <Versioning v-if="isVersioning"/>
    <Roadmap v-if="isRoadmap"/>
    <Support v-if="isSupport"/>
    <FAQ v-if="isFAQ"/>
    <BrowserCompatibility v-if="isBrowserCompatibility"/>
    <QualityCriteria v-if="isQualityCriteria"/>
    <AccessibilityCriteria v-if="isAccessibilityCriteria"/>
  </div>
</template>

<script lang="js">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({
    components: {
      About: () => import(`@/pages/about.md`),
      DesignWorkflow: () => import(`@/pages/design-workflow.md`),
      SketchPlugins: () => import(`@/pages/sketch-plugins.md`),
      StartCoding: () => import(`@/pages/start-coding.md`),
      Updates: () => import(`@/pages/updates.md`),
      Versioning: () => import(`@/pages/versioning.md`),
      Roadmap: () => import(`@/pages/roadmap.md`),
      Support: () => import(`@/pages/support.md`),
      FAQ: () => import(`@/pages/faq.md`),
      BrowserCompatibility: () => import(`@/pages/browser-compatibility.md`),
      QualityCriteria: () => import(`@/pages/quality-criteria.md`),
      AccessibilityCriteria: () => import(`@/pages/accessibility.md`),
    },
  })
  export default class Page extends Vue {

    get isAbout() {
      return this.$route.params.category === 'getting-started' && this.$route.params.page === 'about';
    }

    get isDesignWorkflow() {
      return this.$route.params.category === 'getting-started' && this.$route.params.page === 'design-workflow';
    }

    get isSketchPlugins() {
      return this.$route.params.category === 'getting-started' && this.$route.params.page === 'sketch-plugins';
    }

    get isStartCoding() {
      return this.$route.params.category === 'getting-started' && this.$route.params.page === 'start-coding';
    }

    get isUpdates() {
      return this.$route.params.category === 'news' && this.$route.params.page === 'updates';
    }

    get isVersioning() {
      return this.$route.params.category === 'news' && this.$route.params.page === 'versioning';
    }

    get isRoadmap() {
      return this.$route.params.category === 'news' && this.$route.params.page === 'roadmap';
    }

    get isSupport() {
      return this.$route.params.category === 'help' && this.$route.params.page === 'support';
    }

    get isFAQ() {
      return this.$route.params.category === 'help' && this.$route.params.page === 'faq';
    }

    get isBrowserCompatibility() {
      return this.$route.params.category === 'basics' && this.$route.params.page === 'browser-compatibility';
    }

    get isQualityCriteria() {
      return this.$route.params.category === 'basics' && this.$route.params.page === 'quality-criteria';
    }

    get isAccessibilityCriteria() {
      return this.$route.params.category === 'basics' && this.$route.params.page === 'accessibility-criteria';
    }
  }
</script>
