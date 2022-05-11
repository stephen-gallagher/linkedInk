import React from 'react';
import UserAppointmentsEdit from './UserAppointmentsEdit';
import UserBioEdit from './UserBioEdit';
import UserCollectionsEdit from './UserCollectionsEdit';

export default function UserDashboardEdit({
  user,
  backgroundColor,
  dashboardEditView,
  setDashboardEditView,
  getUser,
  getUserCollections,
  collections,
  setShowComponent,
}) {
  return (
    <div>
      <div className="column">
        <div className="col-8 offset-2 mt-5 ml-1">
          <UserBioEdit
            user={user}
            backgroundColor={backgroundColor}
            dashboardEditView={dashboardEditView}
            setDashboardEditView={setDashboardEditView}
            getUser={getUser}
            setShowComponent={setShowComponent}
          />
        </div>
        <div className="col-8 offset-2 mt-5 ml-1">
          <UserAppointmentsEdit user={user} getUser={getUser} />
        </div>
        <div className="col-8 offset-2 mt-5 ml-1">
          <UserCollectionsEdit
            user={user}
            getUserCollections={getUserCollections}
            collections={collections}
          />
        </div>
      </div>
    </div>
  );
}
