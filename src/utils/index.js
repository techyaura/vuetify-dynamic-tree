// eslint-disable-next-line object-curly-newline
import Vue from 'vue'
import {
  getCurrentInstance, reactive, toRefs, watch,
} from '@vue/composition-api'

// Thanks: https://medium.com/better-programming/reactive-vue-routes-with-the-composition-api-18c1abd878d1
export const useRouter = () => {
  const vm = getCurrentInstance().proxy

  const state = reactive({
    route: vm.$route,
  })

  watch(
    () => vm.$route,
    r => {
      state.route = r
    },
  )

  return { ...toRefs(state), router: vm.$router }
}

export const _ = null

// create event bus
export const EventBus = new Vue()

// transform menu data
export const transformNavData = menuList => {
  const ids = menuList.map(x => x.id)

  return menuList.map(parent => {
    const children = menuList.filter(child => {
      if (child.id !== child.parentId && child.parentId === parent.id) {
        return true
      }

      return false
    })

    if (children.length) {
      // eslint-disable-next-line no-param-reassign
      parent.children = children
    }

    return { ...parent, open: true }

    // return parent
  })
    .filter(obj => {
      if (obj.id === obj.parentId || !ids.includes(obj.parentId)) {
        // include ultimate parents and orphans at root
        return true
      }

      return false
    })
}

export const getAncestors = (target, children = [], ancestors = []) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const node of children) {
    if (node.id === target) {
      return ancestors.concat(node.id)
    }
    const found = getAncestors(target, node.children, ancestors.concat(node.id))
    if (found) {
      return found
    }
  }

  return undefined
}
