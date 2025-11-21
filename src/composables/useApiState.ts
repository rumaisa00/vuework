import { ref } from 'vue';

export function useApiState() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  function start() {
    loading.value = true;
    error.value = null;
  }

  function success() {
    loading.value = false;
    error.value = null;
  }

  function fail(err: any) {
    loading.value = false;
    error.value = err?.message || 'Unknown error';
  }

  return { loading, error, start, success, fail };
}
