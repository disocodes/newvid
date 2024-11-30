import React from 'react';

interface ModelConfigPanelProps {
  config: any;
  onChange: (newConfig: any) => void;
  options: any;
}

export const ModelConfigPanel: React.FC<ModelConfigPanelProps> = ({
  config,
  onChange,
  options
}) => {
  const handleParamChange = (paramName: string, value: any) => {
    onChange({
      ...config,
      properties: {
        ...config.properties,
        params: {
          ...config.properties.params,
          [paramName]: value
        }
      }
    });
  };

  const renderNumericInput = (
    name: string,
    value: number,
    { min, max, step }: { min: number; max: number; step: number }
  ) => (
    <div className="param-input" style={{ marginBottom: '10px' }}>
      <label style={{ display: 'block', marginBottom: '5px' }}>
        {name.charAt(0).toUpperCase() + name.slice(1)}:
      </label>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => handleParamChange(name, parseFloat(e.target.value))}
        style={{
          width: '100%',
          padding: '5px',
          borderRadius: '4px',
          border: '1px solid #ddd'
        }}
      />
    </div>
  );

  const renderSelect = (name: string, value: string, options: string[]) => (
    <div className="param-input" style={{ marginBottom: '10px' }}>
      <label style={{ display: 'block', marginBottom: '5px' }}>
        {name.charAt(0).toUpperCase() + name.slice(1)}:
      </label>
      <select
        value={value}
        onChange={(e) => handleParamChange(name, e.target.value)}
        style={{
          width: '100%',
          padding: '5px',
          borderRadius: '4px',
          border: '1px solid #ddd'
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  const renderCheckbox = (name: string, value: boolean) => (
    <div className="param-input" style={{ marginBottom: '10px' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => handleParamChange(name, e.target.checked)}
        />
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
    </div>
  );

  const renderParameters = () => {
    const { parameters } = options;
    const { params } = config.properties;

    return Object.entries(parameters).map(([name, settings]: [string, any]) => {
      if (typeof settings === 'object' && 'min' in settings) {
        return renderNumericInput(name, params[name], settings);
      }
      return null;
    });
  };

  return (
    <div className="model-config-panel">
      {options.versions && (
        renderSelect('version', config.properties.version, options.versions)
      )}
      
      {options.architectures && (
        renderSelect('modelArchitecture', config.properties.modelArchitecture, options.architectures)
      )}
      
      {options.operations && (
        renderSelect('operation', config.properties.operation, options.operations)
      )}
      
      {renderParameters()}

      {options.preprocessing && (
        <div className="preprocessing-section">
          <h5 style={{ marginTop: '10px', marginBottom: '5px' }}>Preprocessing</h5>
          {Object.entries(options.preprocessing).map(([name, enabled]) => (
            renderCheckbox(name, config.properties.preprocessing?.[name] ?? enabled)
          ))}
        </div>
      )}

      {options.augmentation && (
        <div className="augmentation-section">
          <h5 style={{ marginTop: '10px', marginBottom: '5px' }}>Augmentation</h5>
          {Object.entries(options.augmentation).map(([name, enabled]) => (
            renderCheckbox(name, config.properties.augmentation?.[name] ?? enabled)
          ))}
        </div>
      )}
    </div>
  );
};
