<template>
  <v-navigation-drawer
    :value="isDrawerOpen"
    app
    floating
    width="260"
    class="app-navigation-menu"
    :right="$vuetify.rtl"
    @input="val => $emit('update:is-drawer-open', val)"
  >
    <!-- Navigation Header -->
    <div class="vertical-nav-header d-flex items-center ps-6 pe-5 pt-5 pb-2">
      <router-link
        to="/"
        class="d-flex align-center text-decoration-none"
      >
        <v-img
          :src="require('@/assets/images/logos/logo.svg')"
          max-height="30px"
          max-width="30px"
          alt="logo"
          contain
          eager
          class="app-logo me-3"
        ></v-img>
        <v-slide-x-transition>
          <h2 class="app-title text--primary">
            MATERIO
          </h2>
        </v-slide-x-transition>
      </router-link>
    </div>
    <div v-if="navData.length">
      <v-treeview
        ref="tree"
        root
        dense
        expand-all
        :items="navData"
        :open.sync="openIds"
        :active.sync="activeIds"
        item-key="id"
        activatable
        hoverable
        open-on-click
      >
        <template v-slot:prepend="{ item, open }">
          <v-icon v-if="item.children">
            {{ open ? icons.mdiFolderOpen : icons.mdiFolder }}
          </v-icon>
          <v-icon v-else>
            {{ item.id }}
          </v-icon>
        </template>
        <template
          slot="label"
          slot-scope="{ item }"
        >
          <v-icon
            v-if="!item.children"
            aria-label="File"
            aria-hidden="false"
          >
            {{ icons.mdiFile }}
          </v-icon>
          <a @click="navigate(item)">{{ item.name }}</a>
        </template>
      </v-treeview>
    </div>
  </v-navigation-drawer>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiHomeOutline,
  mdiAlphaTBoxOutline,
  mdiEyeOutline,
  mdiCreditCardOutline,
  mdiTable,
  mdiFileOutline,
  mdiFormSelect,
  mdiAccountCogOutline,
  mdiFolderOpen,
  mdiFolder,
  mdiFile,
} from '@mdi/js'
import { EventBus, transformNavData, getAncestors } from '@/utils'

export default {
  components: {},
  props: {
    isDrawerOpen: {
      type: Boolean,
      default: null,
    },
  },
  setup() {
    return {
      icons: {
        mdiHomeOutline,
        mdiAlphaTBoxOutline,
        mdiEyeOutline,
        mdiCreditCardOutline,
        mdiTable,
        mdiFileOutline,
        mdiFormSelect,
        mdiAccountCogOutline,
        mdiFolderOpen,
        mdiFolder,
        mdiFile,
      },
    }
  },
  data() {
    return {
      exploreId: null,
      navData: [],
      openIds: [],
      activeIds: [],
    }
  },
  watch: {
    navData: {
      handler(newV) {
        if (newV.length && this.exploreId) {
          const ancestors = getAncestors(this.exploreId, newV)
          this.openIds = [...ancestors]
        }
      },
    },
  },
  async mounted() {
    // fetch remote menu list
    const navData = await this.fetchExploreMenu()
    const transformedNavData = transformNavData(navData)
    const [root] = transformedNavData

    // by default open the root folder
    this.openIds.push(root.id)

    // assign the tree data
    this.navData = [...this.navData, ...transformedNavData]
  },
  created() {
    EventBus.$on('EXPLORER-ID', ID => {
      // make the query ID as active
      this.activeIds.push(ID)

      this.exploreId = ID
    })
  },
  methods: {
    listenEventBus() {
      // listen event bus
    },
    navigate(item) {
      if (item.children && item.children.length) {
        return false
      }

      return this.$router.push({ name: 'explorer', query: { active: item.id } })
    },
    selection(leafID) {
      console.log(leafID, 'leafID')
    },
    async fetchExploreMenu() {
      const { data } = await this.$http.get('/explore/menu')

      return data.data || []
    },
  },
}
</script>

<style lang="scss" scoped>
.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
}

// ? Adjust this `translateX` value to keep logo in center when vertical nav menu is collapsed (Value depends on your logo)
.app-logo {
  transition: all 0.18s ease-in-out;

  .v-navigation-drawer--mini-variant & {
    transform: translateX(-4px);
  }
}

@include theme(app-navigation-menu) using ($material) {
  background-color: map-deep-get($material, 'background');
}

.app-navigation-menu {
  .v-list-item {
    &.vertical-nav-menu-link {
      ::v-deep .v-list-item__icon {
        .v-icon {
          transition: none !important;
        }
      }
    }
  }
}
</style>
