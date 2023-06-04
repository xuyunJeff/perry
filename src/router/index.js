import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      component: () => import("@/views/index/index"),
      meta: {
        title: "Payment System",
        keepAlive: true
      }
    },
    {
      path: "/buy",
      meta: {
        title: "Trade"
      },
      component: () => import("@/views/buy/index")
    },
    {
      path: "/account",
      meta: {
        title: "Trade"
      },
      component: () => import("@/views/account/index")
    },
    {
      path: "/my",
      component: () => import("@/views/my/index"),
      redirect: "/my/center",
      children: [
        {
          path: "center",
          meta: {
            title: "Personal Center"
          },
          component: () => import("@/views/my/children/center")
        },
        {
          path: "set",
          meta: {
            title: "Set Up"
          },
          component: () => import("@/views/my/children/set")
        },
        {
          path: "card",
          meta: {
            title: "Bind Bank Card"
          },
          component: () => import("@/views/my/children/card")
        },
        {
          path: "add",
          meta: {
            title: "Add Bank Card"
          },
          component: () => import("@/views/my/children/add")
        },
        {
          path: "code",
          meta: {
            title: "Add QR code"
          },
          component: () => import("@/views/my/children/code")
        },
        {
          path: "addCode",
          meta: {
            title: "Add QR code"
          },
          component: () => import("@/views/my/children/addCode")
        }
      ]
    },
    {
      path: "/login",
      component: () => import("@/views/login/index"),
      meta: {
        title: "Login"
      }
    },
    {
      path: "*",
      component: () => import("@/components/NotFound")
    }
  ]
});

router.beforeEach((to, from, next) => {
  let { title, needLogin } = to.meta;
  let { isLogin } = store.state;
  document.title = title;

  if (needLogin && !isLogin) {
    next({
      path: "/login"
    });
  } else {
    next();
  }
});

export default router;
