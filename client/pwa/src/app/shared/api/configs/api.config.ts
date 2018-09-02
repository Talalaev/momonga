import { Injectable } from '@angular/core';

@Injectable()
export class ApiConfig implements ISApi.apiConfig {
  prefix: string = 'api';
  tokenFieldName: string = 'access_token';
  timeout: number = 10*1000;
  withCredentials: boolean = true;
  cache: boolean = true;
  forcedRefresh: boolean = true;
  agreementId: number = 0;
  serverTZ: number = -5;

  constructor(public name: string = 'main') {
    this.name = name;
  }

  get baseUrl() {
    if (NODE_ENV === 'prod') return `https://lb.home-nadym.ru:86/${this.prefix}`;
    if (NODE_ENV === 'testing') return `https://lb-dev.home-nadym.ru:86/${this.prefix}`;

    return `https://localhost:8686/${this.prefix}`;
  }

  get account() {
    return {
      find: `${this.baseUrl}/Accounts`,
      byId: `${this.baseUrl}/Accounts`, // '/Accounts/{id}'
      byIdAddr: `${this.baseUrl}/Accounts/${this.agreementId}/accountAddr`,
      byIdAgreements: `${this.baseUrl}/Accounts/${this.agreementId}/agreements`,
      byIdDays: `${this.baseUrl}/Accounts/${this.agreementId}/days`,
      byIdVgroups: `${this.baseUrl}/Accounts/${this.agreementId}/vgroups`,
      editProfile: `${this.baseUrl}/Accounts/editProfile`,
      accLK: `${this.baseUrl}/Accounts/lk`,
      login: `${this.baseUrl}/Accounts/login`,
      mobileLogin: `${this.baseUrl}/Accounts/mobileLogin`,
      findByAgrmNumber: `${this.baseUrl}/Accounts/findByAgrmNumber`
    };
  }
  get accountAddr() {
    return {
      find: `${this.baseUrl}/AccountAddrs`
    };
  }
  get addressBuilding() {
    return {
      find: `${this.baseUrl}/AddressBuildings`,
      create: `${this.baseUrl}/AddressBuildings`
    };
  }
  get addressCity() {
    return {
      find: `${this.baseUrl}/AddressCities`
    };
  }
  get addressFlat() {
    return {
      find: `${this.baseUrl}/AddressFlats`,
      create: `${this.baseUrl}/AddressFlats`
    };
  }
  get addressStreet() {
    return {
      find: `${this.baseUrl}/AddressStreets`
    };
  }
  get agreementsComments() {
    return {
      find: `${this.baseUrl}/AgreementsComments`,
      findOne: `${this.baseUrl}/AgreementsComments/findOne`,
      create: `${this.baseUrl}/AgreementsComments`,
      patch: `${this.baseUrl}/AgreementsComments`
    };
  }
  get appeal() {
    return {
      find: `${this.baseUrl}/Appeals`,
      create: `${this.baseUrl}/Appeals`,
      patchById: `${this.baseUrl}/Appeals`,
      deleteById: `${this.baseUrl}/Appeals`,
      createNewWithSources: `${this.baseUrl}/Appeals/createNewWithSources`,
      addNewWithSources: `${this.baseUrl}/Appeals/addNewWithSources`
    };
  }
  get appealCategory() {
    return {
      find: `${this.baseUrl}/AppealCategories`
    }
  }
  get appealConnection() {
    return {
      find: `${this.baseUrl}/AppealConnections`,
      create: `${this.baseUrl}/AppealConnections`
    };
  }
  get appealType() {
    return {
      find: `${this.baseUrl}/AppealTypes`
    }
  }
  get call() {
    return {
      find: `${this.baseUrl}/Calls`,
      findOne: `${this.baseUrl}/Calls/findOne`,
      create: `${this.baseUrl}/Calls`,
      patchById: `${this.baseUrl}/Calls`,
      downloadRecord: `${this.baseUrl}/Calls/downloadRecord`,
      findCallCenterOnly: `${this.baseUrl}/Calls/ourCallCenterCalls`
    };
  }
  get callRequest() {
    return {
      find: `${this.baseUrl}/CallRequests`,
      add: `${this.baseUrl}/CallRequests/add`,
      changeStatus: `${this.baseUrl}/CallRequests/changeStatus`,
      findOne: `${this.baseUrl}/CallRequests/findOne`
    };
  }
  get chat() {
    return {
      find: `${this.baseUrl}/Chats`
    };
  }
  get clientSource() {
    return {
      find: `${this.baseUrl}/ClientSources`,
      countUpById: `${this.baseUrl}/ClientSources/countUp`
    };
  }
  get configLog() {
    return {
      find: `${this.baseUrl}/ConfigLogs`,
      findByVgID: `${this.baseUrl}/ConfigLogs/getLog`
    };
  }
  get day() {
    return {
      getTraffic: `${this.baseUrl}/Days/traffic`
    };
  }
  get device() {
    return {
      all: `${this.baseUrl}/Devices`,
      byId: `${this.baseUrl}/Devices`,
      list: `${this.baseUrl}/Devices/devList`,
      details: `${this.baseUrl}/Devices/devDetailed`,
      configs: `${this.baseUrl}/DeviceConfigs`,
      updateDetails: `${this.baseUrl}/Devices/updateAttributes`,
      updateConfigs: `${this.baseUrl}/DeviceConfigs`
    };
  }
  get deviceConfig() {
    return {
      getConfigs: `${this.baseUrl}/DeviceConfigs`,
      patchById: `${this.baseUrl}/DeviceConfigs` // '/DeviceConfigs/{id}'
    };
  }
  get manager() {
    return {
      all: `${this.baseUrl}/Managers`,
      byId: `${this.baseUrl}/Managers`,
      login: `${this.baseUrl}/Managers/login`
    };
  }
  get notification() {
    return {
      getMessages: `${this.baseUrl}/Notifications/messages`,
      markAsRead: `${this.baseUrl}/Notifications/personalMessage`
    };
  }
  get payment() {
    return {
      getGazpromUrl: `/Payments/get_gazprom_url`,
      getUnitellerUrl: `${this.baseUrl}/Payments/get_uniteller_url`,
      getLast: `${this.baseUrl}/Payments/last`,
      getUsersReport: `${this.baseUrl}/Payments/users_report`
    };
  }
  get personalMessages() {
    return {
      find: `${this.baseUrl}/PersonalMessages`,
      send: `${this.baseUrl}/PersonalMessages/sendMessage`
    };
  }
  get port() {
    return {
      find: `${this.baseUrl}/Ports`,
      findById: `${this.baseUrl}/Ports`,
      fingCount: `${this.baseUrl}/Ports/count`,
      patch: `${this.baseUrl}/Ports`,
      getSNMPPortStatus: `${this.baseUrl}/Ports/snmpPortStatus`,
      delete: `${this.baseUrl}/Ports`,
      unbindByID: `${this.baseUrl}/Ports/unbindPort`
    };
  }
  get rentcharge() {
    return {
      getBalanceHistory: `${this.baseUrl}/Rentcharges/balance_history`,
      findOne: `${this.baseUrl}/Rentcharges/findOne`,
      getVipMonths: `${this.baseUrl}/Rentcharges/vip_months`
    };
  }
  get segment() {
    return {
      findSubnets: `${this.baseUrl}/Segments/getSubnets`,
      findFreeIPs: `${this.baseUrl}/Segments/getFreeIPInSubnet`,
      patchChangeIP: `${this.baseUrl}/Segments/changeIP`
    };
  }
  get subscription() {
    return {
      find: `${this.baseUrl}/Subscriptions`,
      putChange: `${this.baseUrl}/Subscriptions/change`,
      findOne: `${this.baseUrl}/Subscriptions/findOne`
    };
  }
  get systemEvent() {
    return {
      get: `${this.baseUrl}/SystemEvents`,
      getCount: `${this.baseUrl}/SystemEvents/count`
    };
  }
  get tarif() {
    return {
      confirmChange: `${this.baseUrl}/Tarifs/confirm_change`,
      getTariffList: `${this.baseUrl}/Tarifs/myTarifList`,
      getFullTariffList: `${this.baseUrl}/Tarifs/getFullTarifList`
    };
  }
  get tarifHistory() {
    return {
      getByVgId: `${this.baseUrl}/TarifHistories/getHistoryOfChanges`
    };
  }
  get tarifRasp() {
    return {
      delete: `${this.baseUrl}/TarifRasps/cancel_rasp`,
      plan: `${this.baseUrl}/TarifRasps/create_rasp`,
      get: `${this.baseUrl}/TarifRasps/status_rasp`
    };
  }
  get vacation() {
    return {
      byId: `${this.baseUrl}/Vacations`, // /Vacations/{id}
      freeze: `${this.baseUrl}/Vacations/freeze`,
      cancelFreeze: `${this.baseUrl}/Vacations/cancel`,
      confirmFreeze: `${this.baseUrl}/Vacations/confirm`,
      getStatus: `${this.baseUrl}/Vacations/status`,
      getUnprocessed: `${this.baseUrl}/Vacations/getUnprocessedVacations`
    };
  }
  get vgBlockHistory() {
    return {
      getByVgId: `${this.baseUrl}/VgBlockHistories/getHistoryOfBlocks`
    };
  }
  get vgBlockRasp() {
    return {
      find: `${this.baseUrl}/VgBlockRasps`,
      create: `${this.baseUrl}/VgBlockRasps`,
      blockUnblock: `${this.baseUrl}/VgBlockRasps/addBlockUnblock`,
      deleteByVgID: `${this.baseUrl}/VgBlockRasps`
    };
  }
  get vgroup() {
    return {
      byId: `${this.baseUrl}/Vgroups`, // /Vgroups/{id}
      patchByID: `${this.baseUrl}/Vgroups`,
      getHistory: `${this.baseUrl}/Vgroups/getHistory`,
      generatePassword: `${this.baseUrl}/Vgroups/generatePassword`
    };
  }
}
