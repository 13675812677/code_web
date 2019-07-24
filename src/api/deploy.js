import request from '@/utils/request'
import { uuid } from '@/utils/index'
export function addComplain(form) {
  var formData = new FormData()
  formData.append('fileList', form.file)
  var message = {
    id: 'i234bi34ybi34y534',
    channel: '',
    tranCode: 'CreateComplain',
    type: '0',
    dataType: '',
    tranDate: '',
    traceNo: '',
    retCode: '',
    debug: '',
    userid: 'Org1Admin',
    orgid: 'Org1',
    hasGeneric: false,
    errors: null,
    args: [
      {
        'name': 'channelName',
        'value': 'mychannel'
      },
      {
        'name': 'chaincodeName',
        'value': 'example'
      },
      {
        'name': 'functionName',
        'value': 'Invoke'
      },
      {
        'name': 'hasFile',
        'value': 'false'
      },
      {
        'name': 'asyncInvoke',
        'value': 'DISABLE'
      },
      {
        'name': 'otherBusinessArg',
        'value': 'argument'
      }
    ],
    data: [
      {
        'content': {
          'id': uuid(),
          'name': form.name,
          'createDate': null,
          'orgId': '1',
          'roleId': '1',
          'status': '1',
          'workflowId': '1',
          'dataType': 'Complain',
          'content': form.content,
          'company': form.company,
          'materials': form.materials,
          'logs': [
            {
              'id': '',
              'date': '',
              'comments': ''
            }
          ]
        },
        dataType: 'Complain',
        formatType: 'OBJECT'
      }
    ],
    retObject: ''
  }
  formData.append('resMsg', JSON.stringify(message))
  return request({
    method: 'post',
    url: '/api/sdk/complain/',
    data: formData
  })
}
export function getInit() {
  return request({
    method: 'get',
    url: '/init/scripts',
  })
}

export function getInitHome() {

  return request({
    method: 'get',
    url: '/init/scripts/flag',
  })
}
