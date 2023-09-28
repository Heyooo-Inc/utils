import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios'
import axiosRetry from 'axios-retry'

export interface OverridedAxiosInstance
  extends Omit<
    AxiosInstance,
    'request' | 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch' | 'postForm' | 'putForm' | 'patchForm'
  > {
  request<T = any, R = T, D = any>(config: AxiosRequestConfig<D>): Promise<R>
  get<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>
  delete<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>
  head<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>
  options<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>
  post<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>
  put<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>
  patch<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>
  postForm<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>
  putForm<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>
  patchForm<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>
}

export interface CreateAxiosClientConfig<T = any> extends CreateAxiosDefaults<T> {
  retries?: number
  onResponse?: (response: AxiosResponse<T>) => any
  onError?: (error: any) => any
}

export function createAxiosClient(config?: CreateAxiosClientConfig): OverridedAxiosInstance {
  const axiosClient = Axios.create({
    timeout: 10_000,
    validateStatus: status => status >= 200 && status < 300,
    ...config
  })

  axiosClient.interceptors.response.use(
    response => {
      return config?.onResponse ? config.onResponse(response) : response.data
    },
    error => {
      return config?.onError ? config.onError(error) : Promise.reject(error)
    }
  )

  axiosRetry(axiosClient, {
    retries: config?.retries ?? 2
  })

  return axiosClient
}
