import React from 'react';

import {angulars} from './react-wrapper';
import {makeDetailsPage, makeListPage, makeList} from './factory';
import {Cog, ResourceIcon, Timestamp} from './utils'
import {SecretsList, withSecretsList} from './secret';

const Header = () => <div className="row co-m-table-grid__head">
  <div className="col-xs-4">Name</div>
  <div className="col-xs-4">Secrets</div>
  <div className="col-xs-4">Age</div>
</div>;

const ServiceAccountCog = ({serviceaccount}) => {
  const kind = angulars.kinds.SERVICEACCOUNT;
  const {factory: {Delete}} = Cog;
  const options = [Delete].map(f => f(kind, serviceaccount));
  return <Cog options={options} size="small" anchor="left"></Cog>;
}

const ServiceAccountRow = (serviceaccount) => {
  const {metadata: {name, namespace, uid, creationTimestamp}, secrets} = serviceaccount;

  return (
    <div className="row co-resource-list__item">
      <div className="col-xs-4">
        <ServiceAccountCog serviceaccount={serviceaccount} />
        <ResourceIcon kind={angulars.kinds.SERVICEACCOUNT.id}></ResourceIcon>
        <a href={`ns/${namespace}/${angulars.kinds.SERVICEACCOUNT.plural}/${name}/details`} title={uid}>
          {serviceaccount.metadata.name}
        </a>
      </div>
      <div className="col-xs-4">
        {secrets ? secrets.length : 0}
      </div>
      <div className="col-xs-4">
        {moment(creationTimestamp).fromNow()}
      </div>
    </div>
  );
}

const Details = (serviceaccount) => {
  const {metadata: {namespace, creationTimestamp}, secrets} = serviceaccount;
  const filters = {selector: {field: 'metadata.name', values: new Set(_.map(secrets, 'name'))}};

  return (
    <div>
      <div className="co-m-pane__body">
        <div className="row">
          <div className="col-md-6">
            <div className="co-m-pane__body-group">
              <dl>
                <dt>Created At</dt>
                <dd><Timestamp timestamp={creationTimestamp} /></dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div className="co-m-pane__body">
        <div className="row">
          <div className="col-xs-12">
            <h1 className="co-section-title">Secrets</h1>
          </div>
        </div>
        <SecretsList namespace={namespace} filters={filters}></SecretsList>
      </div>
    </div>
  );
}

const pages = [{href: 'details', name: 'Details', component: Details}];
const ServiceAccountsDetailsPage = makeDetailsPage('ServiceAccountsDetailsPage', 'SERVICEACCOUNT', pages);
const ServiceAccountsList = makeList('ServiceAccounts', 'SERVICEACCOUNT', Header, withSecretsList(ServiceAccountRow));
const ServiceAccountsPage = makeListPage('ServiceAccountsPage', 'SERVICEACCOUNT', ServiceAccountsList);
export {ServiceAccountsList, ServiceAccountsPage, ServiceAccountsDetailsPage};