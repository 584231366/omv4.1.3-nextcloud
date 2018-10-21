// require("js/omv/WorkspaceManager.js")
// require("js/omv/workspace/form/Panel.js")
// require("js/omv/form/plugin/LinkedFields.js")
Ext.define('OMV.module.admin.service.nextcloud.Settings', {
    extend: 'OMV.workspace.form.Panel',
    requires: [
        'OMV.form.plugin.LinkedFields'
    ],
	plugins: [{
        ptype: 'linkedfields',
        correlations: [{
            name: [
                'sslcertificateref'
            ],
            conditions: [{
                name: 'ssl_enable',
                value: true
            }],
            properties: [
                'show',
                '!allowBlank',
                '!readOnly'
            ]
        }]
	}],
    // This path tells which RPC module and methods this panel will call to get 
    // and fetch its form values.
    rpcService: 'Nextcloud',
    rpcGetMethod: 'getSettings',
    rpcSetMethod: 'setSettings',
    
    // getFormItems is a method which is automatically called in the 
    // instantiation of the panel. This method returns all fields for 
    // the panel.
    getFormItems: function() {
        return [{
            // xtype defines the type of this entry. Some different types
            // is: fieldset, checkbox, textfield and numberfield. 
            xtype: 'fieldset',
            title: _('General'),
            fieldDefaults: {
                labelSeparator: ''
            },
            // The items array contains items inside the fieldset xtype.
            items: [{
                xtype: 'checkbox',
                // The name option is sent together with is value to RPC
                // and is also used when fetching from the RPC.
                name: 'enable',
                fieldLabel: _('Enable'),
                // checked sets the default value of a checkbox.
                checked: false
            },{
                xtype: 'numberfield',
                name: 'port',
                fieldLabel: _('Port'),
                vtype: 'port',
                minValue: 0,
                maxValue: 65535,
                allowDecimals: false,
                allowNegative: false,
                value: 80
            },{
                xtype: 'checkbox',
                name: 'ssl_enable',
                fieldLabel: _('Enable SSL'),
                checked: false
            }, {
                xtype: 'sslcertificatecombo',
                name: 'sslcertificateref',
                fieldLabel: _('Certificate'),
                allowNone: true,
                allowBlank: true,
                readOnly: true,
                hidden: true,
                value: ''
            },
            {
                xtype: 'sharedfoldercombo',
                name: 'sharedfolderref',
                fieldLabel: _('Directory'),
                allowBlank: true,
                allowNone: true,
                value: ''
            }]
        }];
    }
});

// Register a panel into the GUI.
//
// path: 
//     We want to add the panel in our example node. 
//     The node was configured with the path /service and the id example.
//     The path is therefore /service/example.
//
// className: 
//     The panel which should be registered and added (refers to 
//     the class name).
OMV.WorkspaceManager.registerPanel({
    id: 'settings',
    path: '/service/nextcloud',
    text: _('Settings'),
    position: 10,
    className: 'OMV.module.admin.service.nextcloud.Settings'
});