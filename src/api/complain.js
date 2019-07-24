import request from '@/api/request'
import { uuid } from '@/utils/index'
export function addComplain(msg,form) {
  var formData = new FormData()
  var fileObj = form.file
  for(let i=0;i<fileObj.length;i++){
    formData.append('fileList', fileObj[i].raw)
  }
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
    userid: msg.userid,
    orgid: msg.orgid,
    hasGeneric: false,
    errors: null,
    args: [
      msg.args[0],
      msg.args[1],
      msg.args[2],
      // {
      //   'name': 'channelName',
      //   'value': 'mychannel'
      // },
      // {
      //   'name': 'chaincodeName',
      //   'value': 'example'
      // },
      {
        'name': 'functionName',
        'value': 'Invoke'
      },
      {
        'name': 'hasFile',
        'value': 'true'
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

export function editComplain(msg,form) {
  var formData = new FormData()
  // formData.append('fileList', form.file)
  var message = {
      'id': 'i234bi34ybi34y534',
      'channel': '',
      'tranCode': 'UpdateComplain',
      'type': '0',
      'dataType': '',
      'tranDate': '',
      'traceNo': '',
      'retCode': '',
      'debug': '',
      'userid': msg.userid,
      'orgid': msg.orgid,
      'hasGeneric': false,
      'errors': null,
      'args': [
        msg.args[0],
        msg.args[1],
        msg.args[2],
        // {
        //   'name': 'channelName',
        //   'value': 'mychannel'
        // },
        // {
        //   'name': 'chaincodeName',
        //   'value': 'example'
        // },
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
      'data': [
        {
          'content': {
            'id': form.id,
            'name': form.name,
            'createDate': null,
            'orgId': '1',
            'roleId': '1',
            'status': '1',
            'workflowId': '1',
            'dataType': 'Complain',
            'content': form.content,
            'company': form.company,
            'materials': null,
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
      'retObject': ''
  }
  formData.append('resMsg', JSON.stringify(message))
  return request({
    method: 'put',
    url: '/api/sdk/complain/',
    data: formData
    // contentType: 'multipart/form-data',
    // headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function deleteComplain(msg,form) {
  var formData = new FormData()
  console.log(form)
  var message = {
      'id': 'i234bi34ybi34y534',
      'channel': '',
      'tranCode': 'DelComplain',
      'type': '0',
      'dataType': '',
      'tranDate': '',
      'traceNo': '',
      'retCode': '',
      'debug': '',
      'userid': msg.userid,
      'orgid': msg.orgid,
      'hasGeneric': false,
      'errors': null,
      args: [
        msg.args[0],
        msg.args[1],
        msg.args[2],
        // {
        //   'name': 'channelName',
        //   'value': 'mychannel'
        // },
        // {
        //   'name': 'chaincodeName',
        //   'value': 'example'
        // },
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
        },
        {
          'name': 'ComplainId',
          'value': form.id
        }
      ],
      data: [],
      'retObject': ''
    }
    formData.append('resMsg', JSON.stringify(message))
  return request({
    method: 'delete',
    url: '/api/sdk/complain/',
    data: formData,
  })
}

export function getComplain(msg) {
  var formData = new FormData()
  var message = {
      'id': 'i234bi34ybi34y534',
      'channel': '',
      'tranCode': 'SelectAllComplain',
      'type': '0',
      'dataType': '',
      'tranDate': '',
      'traceNo': '',
      'retCode': '',
      'debug': '',
      'userid': msg.userid,
      'orgid': msg.orgid,
      'hasGeneric': false,
      'errors': null,
      'args': [
        msg.args[0],
        msg.args[1],
        msg.args[2],
        // {
        //   'name': 'channelName',
        //   'value': 'mychannel'
        // },
        // {
        //   'name': 'chaincodeName',
        //   'value': 'example'
        // },
        {
          'name': 'functionName',
          'value': 'Query'
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
      'data': [],
      'retObject': ''
    }
  formData.append('resMsg', JSON.stringify(message))
  return request({
    method: 'post',
    url: '/api/sdk/complain/getList',
    data:formData,
  })
}
export function getParam() {
  return request({
    method: 'get',
    url: '/api/sample/getParam',
  })
}
